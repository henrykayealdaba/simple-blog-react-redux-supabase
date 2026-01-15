import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useLocation, useParams } from "react-router-dom";

type Post = {
  id: string;
  title: string;
  body: string;
  user_id: string;
  created_at: string;
};

export default function BlogDetails() {
  const location = useLocation();
  const params = useParams<{ id: string }>();

  // Initialize blog state with navigate state if available
  const [blog, setBlog] = useState<Post | null>(location.state?.blog || null);

  // Fetch blog if it's not in state (e.g., page refresh)
  useEffect(() => {
    if (!blog && params.id) {
      const fetchBlog = async () => {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("id", params.id)
          .single();

        if (error) {
          console.error("Error fetching blog:", error);
        } else {
          setBlog(data);
        }
      };
      fetchBlog();
    }
  }, [blog, params.id]);

  if (!blog) return <p>Loading blog...</p>; // Show while fetching

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{blog.title}</h1>
      <p className="mt-2">{blog.body}</p>
      <p className="mt-4 text-sm text-gray-500">
        Posted on {new Date(blog.created_at).toLocaleString()}
      </p>
    </div>
  );
}
