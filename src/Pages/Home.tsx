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
        console.log(data);
        setPosts(data || []);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user]);

  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = posts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="flex h-screen w-screen space-x-4 p-4">
      <CreateBlog
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
      <ViewCard currentItems={currentItems} loading={loading} posts={posts} />
    </div>
  );
}
