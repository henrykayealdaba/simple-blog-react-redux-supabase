import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  /*

    TODO: Add a react router, add pages like registration, login, logout
    TODO: Create, update, delete, and list all blogs with pagination
    TODO: Add a supabase and redux, and deploy in vercel
    TODO: Add a exit icon in navbar and add the modal and put register and login
    TODO: Add a blog each account signed in from supabase
    TODO: Change the data in ViewCard component in to real data in supabase

  */

  return (
    <>
      <div className="font-google-sans h-dvh w-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
