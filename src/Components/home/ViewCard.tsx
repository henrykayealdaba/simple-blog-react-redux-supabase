import BlogCard from "./BlogCard";

type Post = {
  id: string;
  title: string;
  body: string;
  user_id: string;
  created_at: string;
};

type ViewCardProps = {
  loading: boolean;
  currentItems: Post[];
  posts: Post[];
};

export default function ViewCard({
  loading,
  currentItems,
  posts,
}: ViewCardProps) {
  return (
    <div className="flex flex-col">
      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <div className="grid h-[50dvh] space-y-4 space-x-4 max-lg:space-y-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {currentItems.map((item) => {
            return <BlogCard key={item.id} data={item} />;
          })}
        </div>
      )}
    </div>
  );
}
