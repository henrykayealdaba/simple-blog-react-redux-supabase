import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";

function App() {
  /*

    TODO: Add a react router, add pages like registration, login, logout
    TODO: Create, update, delete, and list all blogs with pagination
    TODO: Add a supabase and redux, and deploy in vercel
    TODO: Add a exit icon in navbar and add the modal and put register and login

  */

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </>
  );
}

export default App;
