import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <div className="bg-green-400 p-4 shadow">
      <div className="flex items-center justify-between">
        <p className="font-google-sans cursor-pointer text-4xl font-bold text-white transition-transform hover:-translate-y-0.5">
          Simple Blog
        </p>
        <span className="cursor-pointer rounded-sm transition-transform hover:scale-110">
          <Menu size={32} className="transition-colors hover:text-white" />
        </span>
      </div>
    </div>
  );
}
