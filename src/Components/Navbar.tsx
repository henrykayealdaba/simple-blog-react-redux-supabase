import { useState } from "react";
import { Menu, XIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isModal, setIsModal] = useState(false);

  function Modal() {
    return (
      <div className="fixed inset-0 z-50 bg-green-400 p-4">
        <div className="flex items-start justify-between">
          <Link
            to={"/"}
            onClick={() => setIsModal(false)}
            className="cursor-pointer text-4xl font-bold text-white transition-transform hover:-translate-y-0.5 max-xl:text-xl max-lg:text-lg max-md:text-base"
          >
            Simple Blog
          </Link>

          <div className="flex flex-col items-center space-y-4 p-4 text-4xl font-bold text-black">
            <Link
              to={"/register"}
              onClick={() => setIsModal(false)}
              className="cursor-pointer transition-transform hover:-translate-y-0.5 hover:text-white max-xl:text-xl max-lg:text-lg max-md:text-base"
            >
              Register
            </Link>
            <Link
              to={"/login"}
              onClick={() => setIsModal(false)}
              className="cursor-pointer transition-transform hover:-translate-y-0.5 hover:text-white max-xl:text-xl max-lg:text-lg max-md:text-base"
            >
              Login
            </Link>
          </div>

          <button
            onClick={() => setIsModal((modal) => !modal)}
            className="cursor-pointer rounded-sm transition-transform hover:scale-110"
          >
            <XIcon size={32} className="transition-colors hover:text-white" />
          </button>
        </div>
      </div>
    );
  }

  if (isModal) {
    return Modal();
  } else {
    return (
      <div className="h-[10dvh] bg-green-400 p-4 shadow">
        <div className="flex items-center justify-between">
          <Link
            to={"/"}
            onClick={() => setIsModal(false)}
            className="font-google-sans cursor-pointer text-4xl font-bold text-white transition-transform hover:-translate-y-0.5"
          >
            Simple Blog
          </Link>
          <button
            onClick={() => setIsModal((modal) => !modal)}
            className="cursor-pointer rounded-sm transition-transform hover:scale-110"
          >
            <Menu size={32} className="transition-colors hover:text-white" />
          </button>
        </div>
      </div>
    );
  }
}
