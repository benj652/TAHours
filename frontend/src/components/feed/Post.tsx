import { cn } from "@/utils/classNames";
import { Replies } from "./Replies";

export const Post = () => {
  return (
    <div className={cn("flex p-4 w-vw")}>
      <div className={cn("flex flex-col")}>
        <div className={cn("chat-image avatar")}>
          <div className={cn("w-20 p-1")}>
            <img
              src="https://avatar.iran.liara.run/public?username=$420" // user Profile Pic
              alt="Profile Picture"
            />
          </div>
        </div>
      </div>
      <div className={cn("flex flex-col w-full")}>
        <div
          className={cn("chat-bubble text-primary bg-base-100 min-w-31/32 p-2")}
        >
          Erm... What the Sigma skibidi.lang skibidi.lang skibidi.lang
          skibidi.lang skibidi.lang skibidi.lang skibidi.lang skibidi.lang
          sdafhaljdshfkjhsad kjfhkjdsahfkjahsd kjfhkjsadhf kajhds flkaskjdhf
          jksahdf jahsdlkjfhakjsdhf kjashdflkjhsadkjf hlkjsadhf kjahdskf
          haskdfhkjashfd
        </div>
        <div className={cn("flex w-31/32")}>
          <div className={cn("collapse min-h-0 p-0")}>
            <input type="checkbox" />
            <div
              className={cn("collapse-title justify-end text-xs p-1 min-h-0")}
            >
              Replies
            </div>
            <div className={cn("collapse-content")}>
              <Replies />
            </div>
          </div>
          <div className={cn("chat-footer p-1 text-xs whitespace-nowrap")}>
            Sent at: 5:57
          </div>
        </div>
      </div>
      <button
        className={cn(
          "btn w-20 h-20 text-l btn-rectangle bg-accent text-base-100"
        )}
      >
        Delete Post
      </button>
    </div>
  );
};
