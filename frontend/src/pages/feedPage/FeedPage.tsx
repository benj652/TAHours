import { Posts, WritePost } from "@/components";
export const FeedPage = () => {
  return (
    <div className="flex flex-col">
      {
        // Skibidi nav bar
      }
      <Posts />
      <WritePost />
    </div>
  );
};

