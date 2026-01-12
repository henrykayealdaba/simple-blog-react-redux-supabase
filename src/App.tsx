import { Menu } from "lucide-react";

function App() {
  /*

    TODO: Add a react router, add pages like registration, login, logout
    TODO: Create, update, delete, and list all blogs with pagination
    TODO: Add a supabase and redux, and deploy in vercel

  */

  return (
    <>
      <div className="bg-green-400 p-4 shadow">
        <div className="flex items-center justify-between">
          <p className="font-google-sans text-4xl font-bold text-white">
            Simple Blog
          </p>
          <span className="cursor-pointer rounded-sm transition-all hover:bg-emerald-800">
            <Menu size={32} className="transition-colors hover:text-white" />
          </span>
        </div>
      </div>
    </>
  );
}

export default App;
