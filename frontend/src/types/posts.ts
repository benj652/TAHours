import { ObjectId } from "mongodb";

export interface Post {
    _id?: ObjectId;
    user: string;
    title: string;
    body: string;
    comments?: Comment[];
}

// The C in content has to be capital i am too braindead to figure out why rn
export interface Comment {
    user: string;
    Content: string;
    title: string;
}


export type ReplyProps = {
    comments: Comment[] | undefined;
    setComments: React.Dispatch<React.SetStateAction<Comment[] | undefined>>;
}

export type DeletePostResponse = {
    message: string;
}
