import { Reply, WriteReply } from "@/components";
import { ReplyProps } from "@/types";
import { cn } from "@/utils";
import { ObjectId } from "mongodb";

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
      {comments?.map((comment, index) => (
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
