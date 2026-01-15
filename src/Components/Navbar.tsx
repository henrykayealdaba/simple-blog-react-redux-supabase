import { useState } from "react";
import { Menu, XIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/app/store";
import toast from "react-hot-toast";

export default function Navbar() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [isModal, setIsModal] = useState(false);

  function Modal() {
    return (
      <div className="fixed inset-0 z-50 bg-green-400 p-4">
        <div className="flex items-start justify-between">
          <Link
            to={"/"}
            onClick={() => setIsModal(false)}
            className="cursor-pointer text-3xl font-bold text-white transition-transform hover:-translate-y-0.5 max-xl:text-xl max-lg:text-lg max-md:text-base max-sm:text-sm"
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
            {user && (
              <Link
                to={"/"}
                onClick={() => {
                  setIsModal(false);
                  toast.promise(supabase.auth.signOut(), {
                    loading: "Logging in",
                    success: "User logged out!",
                    error: "Something went wrong!",
                  });
                }}
                className="cursor-pointer transition-transform hover:-translate-y-0.5 hover:text-white max-xl:text-xl max-lg:text-lg max-md:text-base"
              >
                Logout
              </Link>
            )}
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
            className="cursor-pointer text-4xl font-bold text-white transition-transform hover:-translate-y-0.5 max-xl:text-xl max-lg:text-lg"
          >
            Simple Blog
          </Link>
          <div className="flex items-center justify-center space-x-4">
            {user ? (
              <div className="font-bold text-white">{user.email}</div>
            ) : (
              <div className="font-bold text-white">Hello anonymous</div>
            )}
            <button
              onClick={() => setIsModal((modal) => !modal)}
              className="cursor-pointer rounded-sm transition-transform hover:scale-110"
            >
              <Menu size={32} className="transition-colors hover:text-white" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}
