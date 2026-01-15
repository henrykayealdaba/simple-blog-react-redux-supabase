import BlogCard from "./BlogCard";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function ViewCard() {
  // TODO: Replace this using supabase data
  const items = [
    { id: 1, title: "This is title", body: "This is body" },
    { id: 2, title: "This is title", body: "This is body" },
    { id: 3, title: "This is title", body: "This is body" },
    { id: 4, title: "This is title", body: "This is body" },
    { id: 5, title: "This is title", body: "This is body" },
  ];

  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col space-y-4">
      <div className="grid h-[50dvh] space-x-4 max-lg:space-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {currentItems.map((item) => {
          return <BlogCard key={item.id} data={item} />;
        })}
      </div>

      <div className="space-x-4">
        <button
          onClick={() => setCurrentPage((p) => p - 1)}
          className={`rounded-sm px-4 py-1 outline-1 outline-zinc-400 hover:bg-gray-50 ${currentPage === 1 ? "cursor-not-allowed blur-xs" : "cursor-pointer"}`}
          disabled={currentPage === 1}
        >
          <ArrowLeft className="inline-block" />
          <span className="inline-block">Prev</span>
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((p) => p + 1)}
          className={`rounded-sm px-4 py-1 outline-1 outline-zinc-400 hover:bg-gray-50 ${currentPage === totalPages ? "cursor-not-allowed blur-xs" : "cursor-pointer"}`}
          disabled={currentPage === totalPages}
        >
          <span className="inline-block">Next</span>
          <ArrowRight className="inline-block" />
        </button>
      </div>
    </div>
  );
}
