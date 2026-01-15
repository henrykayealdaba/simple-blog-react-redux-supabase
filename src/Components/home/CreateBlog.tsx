import { Plus } from "lucide-react";
import { useState } from "react";
import { supabase } from "../../lib/supabase";
import type { RootState } from "../../redux/app/store";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function CreateBlog() {
  // const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const insertPost = async () => {
        const { error } = await supabase.from("posts").insert({
          title,
          body,
          user_id: user.id,
        });

        if (error) throw error;
      };

      await toast.promise(insertPost(), {
        loading: "Inserting blog...",
        success: "New blog posted!",
        error: "Blog insert error!",
      });

      // navigate(0);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
      setTitle("");
      setBody("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-[48dvh] w-60 space-y-4 rounded-sm bg-gray-50 p-2 shadow"
    >
      <label className="flex flex-col">
        <span className="text-lg">Title</span>
        <input
          type="text"
          className="rounded-xs p-1 shadow-xs outline-1 outline-zinc-400"
          placeholder="Put any title here..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={100}
          required
        />
      </label>
      <label className="flex flex-col">
        <span className="text-lg">Body</span>
        <textarea
          className="max-h-40 min-h-6 rounded-xs p-1 shadow-xs outline-1 outline-zinc-400"
          placeholder="Write your body here..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
      </label>
      <button
        type="submit"
        disabled={loading}
        className="group flex w-full cursor-pointer items-center justify-between rounded-sm p-2 outline-1 outline-zinc-400 hover:bg-gray-200 focus:bg-gray-200 focus:outline-blue-600 active:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span className="select-none">Add blog</span>
        <div
          className={`rounded outline-gray-400 transition-all duration-75 group-hover:shadow group-hover:outline-1 group-focus:shadow group-focus:outline-1 group-focus:outline-blue-600 ${loading && "blur-xs"}`}
        >
          <Plus />
        </div>
        {error && (
          <p
            className={`rounded-sm p-1 text-sm text-rose-800 ${error ? "bg-rose-200/50" : "bg-none"}`}
          >
            {error}
          </p>
        )}
      </button>
    </form>
  );
}
