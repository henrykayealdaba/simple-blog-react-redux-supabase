import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/app/store";
import CreateBlog from "../components/home/CreateBlog";
import ViewCard from "../components/home/ViewCard";

type Post = {
  id: string;
  title: string;
  body: string;
  user_id: string;
  created_at: string;
};

export default function Home() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const ITEMS_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!user) return;

    const fetchPosts = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setPosts(data || []);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user]);

  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = posts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  async function insertPost(title: string, body: string) {
    if (!user) return;

    const { data, error } = await supabase
      .from("posts")
      .insert({
        title,
        body,
        user_id: user.id,
      })
      .select()
      .single();

    if (error) throw error;

    setPosts((prev) => [data, ...prev]);
  }

  async function updatePost(id: string, title: string, body: string) {
    if (!user) return;

    const { data, error } = await supabase
      .from("posts")
      .update({ title, body })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    setPosts((prev) => prev.map((post) => (post.id === id ? data : post)));
  }

  async function deletePost(id: string) {
    const { error } = await supabase.from("posts").delete().eq("id", id);

    if (error) throw error;
    setPosts((prev) => prev.filter((post) => post.id !== id));
  }

  return (
    <div className="flex h-screen w-screen space-x-4 p-4">
      <CreateBlog
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        onInsertPost={insertPost}
      />
      <ViewCard
        currentItems={currentItems}
        loading={loading}
        posts={posts}
        onUpdatePost={updatePost}
        onDeletePost={deletePost}
      />
    </div>
  );
}
