import { ArrowRight, ArrowLeft } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

export default function Pagination({
  currentPage,
  setCurrentPage,
  totalPages,
}: {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
}) {
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => setCurrentPage((p) => p - 1)}
        disabled={currentPage === 1}
        className={`rounded-sm px-4 py-1 outline-1 outline-zinc-400 hover:bg-gray-50 ${
          currentPage === 1 ? "cursor-not-allowed blur-xs" : "cursor-pointer"
        }`}
      >
        <ArrowLeft className="inline-block" />
        <span className="inline-block">Prev</span>
      </button>

      <span>
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => setCurrentPage((p) => p + 1)}
        disabled={currentPage === totalPages}
        className={`rounded-sm px-4 py-1 outline-1 outline-zinc-400 hover:bg-gray-50 ${
          currentPage === totalPages
            ? "cursor-not-allowed blur-xs"
            : "cursor-pointer"
        }`}
      >
        <span className="inline-block">Next</span>
        <ArrowRight className="inline-block" />
      </button>
    </div>
  );
}
