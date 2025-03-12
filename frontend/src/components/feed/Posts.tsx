import { threadStore } from "@/store";
import { useEffect, useRef } from "react";
import { Post as PostComponent } from "./Post";

// type PostsProps = {
//     posts: PostType[] | null;
//     setPosts: React.Dispatch<React.SetStateAction<PostType[] | null>>;
// };

export const Posts: React.FC = () => {
  const postRef = useRef<HTMLDivElement>(null);

  const { data: posts, setData: setPosts } = threadStore();

  useEffect(() => {
    postRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [posts]);

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
