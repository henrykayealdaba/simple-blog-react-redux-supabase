interface EditBlogModalProps {
  title: string;
  setTitle: (title: string) => void;
  body: string;
  setBody: (body: string) => void;
  setIsEditing: (isEditing: boolean) => void;
  loading: boolean;
  handleUpdate: () => void;
}

export default function EditBlogModal({
  title,
  setTitle,
  body,
  setBody,
  setIsEditing,
  loading,
  handleUpdate,
}: EditBlogModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-80 space-y-2 rounded bg-white p-4 shadow">
        <h2 className="mb-2 text-lg font-bold">Edit Blog</h2>
        <label className="flex flex-col">
          <span className="text-lg">Title</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-sm border border-zinc-400 p-2 ring-zinc-400 transition-all duration-150 hover:ring-2 focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-lg">Body</span>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="max-h-40 min-h-6 rounded-sm border border-zinc-400 p-2 ring-zinc-400 transition-all duration-150 hover:ring-2 focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />
        </label>

        <div className="flex justify-end gap-2">
          <button
            className={`cursor-pointer rounded-sm px-4 py-1 outline-1 outline-zinc-400 hover:bg-gray-50`}
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
          <button
            disabled={loading}
            onClick={handleUpdate}
            className={`rounded-sm px-4 py-1 outline-1 outline-zinc-400 hover:bg-gray-50 ${
              !body && !title ? "cursor-not-allowed blur-xs" : "cursor-pointer"
            }`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
