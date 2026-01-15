import { Wrench, Trash } from "lucide-react";

export default function BlogCard({
  data,
}: {
  data: { title: string; body: string };
}) {
  return (
    <div className="flex h-52 w-52 min-w-32 cursor-pointer flex-col justify-between rounded-sm bg-gray-50 p-2 shadow transition-colors duration-75 ease-in-out hover:bg-gray-100">
      <div>
        <p className="line-clamp-2 font-serif text-xl font-bold wrap-break-word">
          {data.title}
        </p>
        <p className="line-clamp-3 wrap-break-word">{data.body}</p>
      </div>
      <div className="flex space-x-2 self-end">
        <button
          title="Update"
          className="cursor-pointer rounded-sm p-1 hover:bg-blue-200"
        >
          <Wrench />
        </button>
        <button
          title="Delete"
          className="cursor-pointer rounded-sm p-1 hover:bg-red-200"
        >
          <Trash />
        </button>
      </div>
    </div>
  );
}
