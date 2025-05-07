//replies.tsx component representing all replies under a post
import { Reply, WriteReply } from "@/components";
import { ReplyProps } from "@/types";
import { cn } from "@/utils";
import { ObjectId } from "mongodb";

/**
 * A component that represents all replies under a post
 * @param id the id of the post being replied to
 * @param comments all existing replies under the post
 * @param setComments a function to update the replies
 * @returns A complete set of replies under a post w/ a form to write a new reply
 */

type ExtendedReplyProps = ReplyProps & {
  id: ObjectId | undefined;
};
// Ok this is like a 5-6 level prop drill from the Feed page kinda sus but like it lowkey flows pretty well.
export const Replies: React.FC<ExtendedReplyProps> = ({
  id,
  comments,
  setComments,
}) => {
  return (
    <div className={cn("flex flex-col w-full gap-2 ali float-right")}>
      {comments?.slice(1).map((comment, index) => (
        <Reply
          key={index}
          reply={comment}
          comments={comments}
          setComments={setComments}
        />
      ))}
      <WriteReply id={id} comments={comments} setComments={setComments} />
    </div>
  );
};
