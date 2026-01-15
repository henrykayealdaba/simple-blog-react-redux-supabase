import { useState } from "react";
import { Wrench, Trash } from "lucide-react";
import toast from "react-hot-toast";
import EditBlogModal from "./EditBlogModal";
import { useNavigate } from "react-router-dom";

type Post = {
  id: string;
  title: string;
  body: string;
  user_id: string;
  created_at: string;
};

export default function BlogCard({
  data,
  onUpdatePost,
  onDeletePost,
}: {
  data: Post;
  onUpdatePost: (id: string, title: string, body: string) => Promise<void>;
  onDeletePost: (id: string) => Promise<void>;
}) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(data.title);
  const [body, setBody] = useState(data.body);
  const [loading, setLoading] = useState(false);

  async function handleUpdate() {
    try {
      setLoading(true);
      await toast.promise(onUpdatePost(data.id, title, body), {
        loading: "Updating blog...",
        success: "Blog updated!",
        error: "Blog update error!",
      });
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>): void {
    if (event.key === "Escape") {
      setIsEditing(false);
    }
  }

  async function handleDelete() {
    try {
      await toast.promise(onDeletePost(data.id), {
        loading: "Deleting blog...",
        success: "Blog deleted!",
        error: "Blog delete error!",
      });
    } catch (error) {
      console.error(error);
    }
  }

  function handleViewDetails() {
    navigate(`/blog/${data.id}`, { state: { blog: data } });
  }

  return (
    <>
      <div onKeyDown={handleKeyDown}>
        {isEditing && (
          <EditBlogModal
            title={title}
            setTitle={setTitle}
            body={body}
            setBody={setBody}
            setIsEditing={setIsEditing}
            loading={loading}
            handleUpdate={handleUpdate}
          />
        )}
        <div
          onClick={handleViewDetails}
          className="flex h-52 w-52 min-w-32 cursor-pointer flex-col justify-between rounded-sm bg-gray-50 p-2 shadow transition-colors duration-75 ease-in-out hover:bg-gray-100"
        >
          <div>
            <p className="line-clamp-2 font-serif text-xl font-bold wrap-break-word">
              {data.title}
            </p>
            <p className="line-clamp-3 wrap-break-word">{data.body}</p>
          </div>
          <div className="flex space-x-2 self-end">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
              title="Update"
              className="cursor-pointer rounded-sm p-1 hover:bg-blue-200"
            >
              <Wrench />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              title="Delete"
              className="cursor-pointer rounded-sm p-1 hover:bg-red-200"
            >
              <Trash />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
