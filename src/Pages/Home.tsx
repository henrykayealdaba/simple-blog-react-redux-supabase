import CreateBlog from "../components/home/CreateBlog";
import ViewCard from "../components/home/ViewCard";

export default function Home() {
  return (
    <div className="flex space-x-4 p-4">
      <CreateBlog />
      <ViewCard />
    </div>
  );
}
