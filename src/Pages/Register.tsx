import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/auth/authSlice";
export default function Register() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function registerUser(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) throw error;
    return data.user;
  }

  async function handleRegister() {
    if (isLoading) return;

    setIsLoading(true);

    try {
      if (password !== confirmPassword) {
        throw new Error("Password are not matched!");
      }
      const user = await toast.promise(registerUser(email, password), {
        loading: "Loading",
        success: "User registered!",
        error: "Something went wrong!",
      });
      dispatch(setUser(user));
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigate("/");
    } catch (error) {
      console.log(error);

      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("Something went wrong!");
      }

      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>): void {
    if (event.key === "Enter") {
      handleRegister();
    }
  }

  return (
    <div className="flex w-screen flex-col items-center justify-center space-y-8 p-4">
      <div
        onKeyDown={handleKeyDown}
        className="flex h-[55dvh] flex-col items-center justify-center space-y-4 rounded-sm border bg-gray-50 p-8 shadow"
      >
        <h2 className="text-xl font-bold">Register</h2>
        <label>
          <span className="block">Email Address</span>
          <input
            className="rounded-sm border border-zinc-400 p-2 ring-zinc-400 transition-all duration-150 hover:ring-2 focus:ring-2 focus:ring-blue-600 focus:outline-none"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span className="block">Password</span>
          <input
            className="rounded-sm border border-zinc-400 p-2 ring-zinc-400 transition-all duration-150 hover:ring-2 focus:ring-2 focus:ring-blue-600 focus:outline-none"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          <span className="block">Confirm Password</span>
          <input
            className="rounded-sm border border-zinc-400 p-2 ring-zinc-400 transition-all duration-150 hover:ring-2 focus:ring-2 focus:ring-blue-600 focus:outline-none"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <button
          className={`rounded-sm border border-zinc-400 px-6 py-2 font-semibold transition-all duration-150 ${email && password && confirmPassword && !isLoading ? "bg-green-400 text-white hover:bg-green-500 active:bg-green-600" : "bg-green-200/50 text-zinc-600/50"}`}
          onClick={handleRegister}
          disabled={isLoading}
        >
          Register
        </button>
        <p
          className={`rounded-sm p-1 text-sm text-rose-800 ${message ? "bg-rose-200/50" : "bg-none"}`}
        >
          {message}
        </p>
      </div>
      <div>
        <p className="text-sm">
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-400">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
