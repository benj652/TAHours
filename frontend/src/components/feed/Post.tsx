import { useDeletePost } from "@/hooks/posts/useDeletePost";
import { authStore } from "@/store";
import { Post as PostType, RolesConfig } from "@/types";
import { cn } from "@/utils/classNames";
import { useState } from "react";
import { Replies } from "./Replies";

type PostProps = {
  post: PostType;
  posts: PostType[];
  setPosts: (posts: PostType[]) => void;
};

// lowkey doing some heavy prop drilling here but it's fine bc its such a subset of the service
export const Post: React.FC<PostProps> = ({
  posts,
  setPosts,
  post: { _id, user, title, body, comments },
}) => {
  const { userItems } = authStore();
  const isAdmin =
    userItems.roles === RolesConfig.Professor ||
    userItems.roles === RolesConfig.Admin;

  const { loading, error, deletePost } = useDeletePost();
  const [curComments, setCurComments] = useState(comments);

  // this function deletes the post
  const handleDeleteSelf = async () => {
    const userResponse = confirm("Are you sure you want to delete this post?");
    if (!userResponse) {
      return;
    }
    deletePost(_id);
    if (error) {
      return;
    }
    setPosts(posts.filter((post) => post._id !== _id));
  };
  return (
    <div className={cn("flex p-4 w-vw")}>
      <div className={cn("flex flex-col p-2")}>
        <div className={cn("avatar")}>
          <div className={cn("h-20 w-20 rounded-full border-2")}>
            <img
              src={title} // user Profile Pic
              alt="Profile Picture"
            />
          </div>
        </div>
      </div>
      <div className={cn("flex flex-col w-full")}>
        <p>{user}</p>
        <div
          className={cn("chat-bubble text-primary bg-base-100 min-w-31/32 p-2")}
        >
          {body}
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
              <Replies
                id={_id}
                comments={curComments}
                setComments={setCurComments}
              />
            </div>
          </div>
        </div>
      </div>
      {isAdmin && (
        <button
          className={cn(
            "btn w-20 h-20 mt-6 text-l btn-rectangle bg-accent text-base-100"
          )}
          onClick={handleDeleteSelf}
          disabled={loading}
        >
          Delete Post
        </button>
      )}
    </div>
  );
};
// <div className={cn("chat-footer p-1 text-xs whitespace-nowrap")}> Sent at: 5:57 </div>
