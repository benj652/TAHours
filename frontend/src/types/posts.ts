import { ObjectId } from "mongodb";

export interface Post {
    _id?: ObjectId;
    user: string;
    title: string;
    body: string;
    comments?: Comment[];
}

export interface Comment {
    user: string;
    content: string;
}
