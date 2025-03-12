import { useCreateComment } from "@/hooks/posts/useCreateComment";
import { threadStore } from "@/store";
import { ReplyProps } from "@/types";
import { Send } from "lucide-react";
import { ObjectId } from "mongodb";
import { useState } from "react";

type ExtendedReplyProps = ReplyProps & {
  id: ObjectId | undefined;
};

/**
 * A component for writing a reply to a post
 * @param id The ID of the post to reply to
 * @param comments The current comments on the post
 * @param setComments A function to update the comments on the post
 * @returns A form component for writing a reply
 */
export const WriteReply: React.FC<ExtendedReplyProps> = ({
  id,
  comments,
  setComments,
}) => {
  const [curBody, setCurBody] = useState<string>("");
  const { loading, createComment, error } = useCreateComment();
  const { data } = threadStore();
  // console.log(curBody);
  // handles submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (curBody === "") {
      return;
    }
    const newComment = await createComment(id, curBody);
    if (error) return;
    if (!newComment) return;
    setComments([...(comments || []), newComment]);
    setCurBody("");
    if (!data) return;
    const curTarget = data.find((post) => post._id === id);
    if (!curTarget) return;
    if (!curTarget.comments) {
      curTarget.comments = [newComment];
    } else {
      curTarget.comments.push(newComment);
    }
  };
  // returns the css
  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          placeholder="Enter reply..."
          className="border text-sm rounded-lg block w-full p-2 bg-base-300"
          onChange={(e) => setCurBody(e.target.value)}
          value={curBody}
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
