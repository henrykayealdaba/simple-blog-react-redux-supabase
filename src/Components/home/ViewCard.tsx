import BlogCard from "./BlogCard";
import { Loader2 } from "lucide-react";
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
  onUpdatePost: (id: string, title: string, body: string) => Promise<void>;
  onDeletePost: (id: string) => Promise<void>;
};

export default function ViewCard({
  loading,
  currentItems,
  posts,
  onUpdatePost,
  onDeletePost,
}: ViewCardProps) {
  return (
    <div className="flex flex-col">
      {loading ? (
        <div className="flex space-x-2">
          <Loader2 className="animate-spin" />
          <p>Loading posts...</p>
        </div>
      ) : posts.length === 0 ? (
        <p>You have no post yet {":("}</p>
      ) : (
        <div className="grid h-[50dvh] space-y-4 space-x-4 max-lg:space-y-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {currentItems.map((item) => {
            return (
              <BlogCard
                key={item.id}
                data={item}
                onUpdatePost={onUpdatePost}
                onDeletePost={onDeletePost}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
