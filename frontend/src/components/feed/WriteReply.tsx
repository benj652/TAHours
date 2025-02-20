import { useCreateComment } from "@/hooks/posts/useCreateComment";
import { ReplyProps } from "@/types";
import { ObjectId } from "mongodb";
import { useState } from "react";

type ExtendedReplyProps = ReplyProps & {
    id: ObjectId | undefined;
}

export const WriteReply: React.FC<ExtendedReplyProps> = ({ id, comments, setComments }) => {
  const [curBody, setCurBody] = useState<string>("");
  const { loading, createComment, error } = useCreateComment();
    // console.log(curBody);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (curBody === "") {
      return;
    }
        const newComment = await createComment(id, curBody);
        if(error) return;
        setComments([...comments, newComment]); // litteraly no clue what the error is but ik it is some typescript nonsense so we can prob just ignore it
  };
  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          placeholder="Enter reply..."
          className="border text-sm rounded-lg block w-full p-2 bg-base-300"
          onChange={(e) => setCurBody(e.target.value)}
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
