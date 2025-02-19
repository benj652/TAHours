import { Reply, WriteReply } from "@/components";
import { cn } from "@/utils";

export const Replies = () => {
  return (
    <div className={cn("flex flex-col w-full gap-2 ali float-right")}>
      <Reply />
      <Reply />
      <Reply />
      <WriteReply />
    </div>
  );
};
