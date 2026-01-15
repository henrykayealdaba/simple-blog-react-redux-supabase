import { Plus } from "lucide-react";

export default function CreateBlog() {
  return (
    <form className="h-[48dvh] w-60 space-y-4 rounded-sm bg-gray-50 p-2 shadow">
      <label className="flex flex-col">
        <span className="text-lg">Title</span>
        <input
          type="text"
          className="rounded-xs p-1 shadow-xs outline-1 outline-zinc-400"
          placeholder="Put any title here..."
        />
      </label>
      <label className="flex flex-col">
        <span className="text-lg">Body</span>
        <textarea
          className="max-h-40 min-h-6 rounded-xs p-1 shadow-xs outline-1 outline-zinc-400"
          placeholder="Write your body here..."
        />
      </label>
      <div className="group flex cursor-pointer items-center justify-between rounded-sm p-2 hover:bg-gray-200 active:bg-gray-300">
        <span className="select-none">Add blog</span>
        <button className="rounded outline-gray-400 transition-all duration-75 group-hover:shadow group-hover:outline-1">
          <Plus />
        </button>
      </div>
    </form>
  );
}
