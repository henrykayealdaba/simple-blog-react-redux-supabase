import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { supabase } from "./lib/supabase";
import { clearUser, setUser } from "./redux/auth/authSlice";
import PublicRoute from "./redux/routes/PublicRoute";
import PrivateRoute from "./redux/routes/PrivateRoute";

function App() {
  /*

    TODO: Add a react router, add pages like registration, login, logout
    TODO: Create, update, delete, and list all blogs with pagination
    TODO: Add a supabase and redux, and deploy in vercel
    TODO: Add a exit icon in navbar and add the modal and put register and login
    TODO: Add a blog each account signed in from supabase
    TODO: Change the data in ViewCard component in to real data in supabase

  */

  const dispatch = useDispatch();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error("Session error: ", error);
          dispatch(clearUser());
          return;
        }

        dispatch(setUser(data.session?.user ?? null));
      } catch (error) {
        console.error("Unexpected auth error: ", error);
        dispatch(clearUser());
      }
    };

    initAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      try {
        dispatch(setUser(session?.user ?? null));
      } catch (err) {
        console.error("Auth state change error:", err);
        dispatch(clearUser());
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [dispatch]);

  return (
    <>
      <div className="font-google-sans h-dvh w-screen">
        <Toaster position="bottom-center" />
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          ></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
