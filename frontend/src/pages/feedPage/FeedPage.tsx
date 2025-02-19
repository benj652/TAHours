import { Posts, WritePost } from "@/components";
export const FeedPage = () => {
  return (
    <div className="flex flex-col bg-base-300 min-h-[calc(100vh-74px)] justify-between">
      <Posts />
      <WritePost />
    </div>
  );
};
