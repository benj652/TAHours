//reply.tsx component representing a single reply

import { Comment, ReplyProps } from "@/types";

type ExtendedReplyProps = ReplyProps & {
  reply: Comment;
};
export const Reply: React.FC<ExtendedReplyProps> = ({ reply }) => {
  return (
    <div className="chat chat-end">
      <div className="chat-image avatar">
        {reply.user}
        <div className="w-10 rounded-full">
          <img src={reply.title} alt="avatar" />
        </div>
      </div>
      <div className="chat-bubble text-primary bg-base-100">
        {reply.Content}
      </div>
    </div>
  );
};
// <div className="chat-footer">5:57</div>
