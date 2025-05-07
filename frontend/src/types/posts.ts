/*
 * posts.ts
 *
* This file contains the types for the posts and comments
 */
import { ObjectId } from "mongodb";

// This is for the posts
// Defines the shape and is identical
// To the backend
export interface Post {
    _id?: ObjectId;
    user: string;
    title: string;
    body: string;
    comments?: Comment[];
}

// The C in content has to be capital i am too braindead to figure out why rn
// This is identical to the one on the backend
export interface Comment {
    user: string;
    Content: string;
    title: string;
}

// This is for to reply to a post
export type ReplyProps = {
    comments: Comment[] | undefined;
    setComments: React.Dispatch<React.SetStateAction<Comment[] | undefined>>;
};

// this is what the delete post hook returns
export type DeletePostResponse = {
    message: string;
};
