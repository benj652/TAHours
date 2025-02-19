import { Posts, WritePost } from "@/components";
export const FeedPage = () => {
  return (
    <div className="flex flex-col bg-base-300 min-h-screen">
      <Posts />
      <WritePost />
    </div>
  );
};
