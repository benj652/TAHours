import { useCreatePost } from "@/hooks/posts/useCreatePost";
import { threadStore } from "@/store";
import { useState } from "react";

// type WritePostProps = {
//     posts: Post[] | null;
//     setPosts: React.Dispatch<React.SetStateAction<Post[] | null>>;
// };
export const WritePost: React.FC = () => {
  const { data: posts, setData: setPosts } = threadStore();
  const [postBody, setPostBody] = useState<string>("");
  const { createPost, loading } = useCreatePost();
  const { data, setData } = threadStore();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPost = await createPost(postBody);
    if (!newPost) return;
    if (!posts) {
      setPosts([newPost]);
      return;
    }
    setPosts([...posts, newPost]);
    setData([...(data || []), newPost]);
    setPostBody("");
  };
  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          placeholder="Enter message..."
          className="border text-sm rounded-lg block w-full p-2 bg-base-300"
          onChange={(e) => setPostBody(e.target.value)}
          value={postBody}
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
          disabled={loading}
        >
          {" "}
          Icon{" "}
        </button>
      </div>
    </form>
  );
};
