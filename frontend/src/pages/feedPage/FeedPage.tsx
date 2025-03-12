import { Posts, WritePost } from "@/components";
import { useGetAllPosts } from "@/hooks/posts/useGetAllPosts";
import { useEffect } from "react";

export const FeedPage = () => {
  const { getAllPosts } = useGetAllPosts();
  useEffect(() => {
    getAllPosts();
  }, []);

  // console.log(posts);

  return (
    <div className="flex flex-col bg-base-300 h-[calc(100vh-74px)]  justify-between overflow-y-auto">
      <Posts />
      <WritePost />
    </div>
  );
};
