//writepost.tsx input box to write posts
import { useCreatePost } from "@/hooks/posts/useCreatePost";
import { threadStore } from "@/store";
import { Send } from "lucide-react";
import { useState } from "react";

/**
 * A component for writing a post
 * @param comments The current comments on the post
 * @param setPostBody A function to set the text of the post
 * @param createPost A function to send post to backend
 * @param setPosts A function to update thread
 * @returns A form component for writing a post
 */

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
    setPosts([...posts, newPost]); //adds post to thread
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
          <Send />
        </button>
      </div>
    </form>
  );
};
