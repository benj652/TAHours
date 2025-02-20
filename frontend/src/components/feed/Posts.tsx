import { Post as PostComponenet} from "./Post";
import {Post as PostType} from "@/types";

type PostsProps = {
    posts: PostType[] | null;
    setPosts: React.Dispatch<React.SetStateAction<PostType[] | null>>;
};
export const Posts: React.FC<PostsProps> = ({ posts, setPosts }) => {
    return (
        <div>
            {
                posts?.map((post, index) => (
                    <PostComponenet key={index} post={post} posts={posts} setPosts={setPosts} />
                ))
            }
        </div>
    );
};

export default Posts;
