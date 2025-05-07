//posts.tsx component representing all posts within the thread
import { threadStore } from "@/store";
import { useEffect, useRef } from "react";
import { Post as PostComponent } from "./Post";

/**
 * A component that represents all posts within the thread
 * @param posts all posts within the thread
 * @returns A complete set of posts
 */

export const Posts: React.FC = () => {
  const postRef = useRef<HTMLDivElement>(null);

  const { data: posts, setData: setPosts } = threadStore(); //get the posts from the thread store

  useEffect(() => {
    postRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [posts]); // creates the scroll

  return (
    <div>
      {posts?.map((post, index) => (
        <div
          key={post._id?.toString()}
          ref={index === posts.length - 1 ? postRef : null}
        >
          <PostComponent
            key={index}
            post={post}
            posts={posts}
            // eslint-expect-error
            setPosts={setPosts}
          />
        </div>
      ))}
    </div>
  );
};

export default Posts;
