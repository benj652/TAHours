import { Posts, WritePost } from "@/components";
import { useGetAllPosts } from "@/hooks/posts/useGetAllPosts";
import { useEffect, useState } from "react";
export const FeedPage = () => {
    const { getAllPosts, data: posts, setData: setPosts } = useGetAllPosts();
    useEffect(() => {
        getAllPosts();
    }, []);
    console.log(posts);

    return (
        <div className="flex flex-col bg-base-300 min-h-[calc(100vh-74px)] justify-between">
            <Posts posts={posts} setPosts={setPosts} />
            <WritePost posts={posts} setPosts={setPosts} />
        </div>
    );
};
