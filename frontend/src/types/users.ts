import { ObjectId } from "mongodb";

export interface User {
  _id?: ObjectId; // Optional because of `omitempty`
  accessToken: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePic: string;
  description?: string;
  roles: Role; // Uses the `Role` type
}

// Enum for role values
export enum Role {
  Professor = "professor",
  Ta = "ta",
  Admin = "admin",
  Student = "student",
}

export const RolesConfig = {
  Professor: Role.Professor,
  Ta: Role.Ta,
  Admin: Role.Admin,
  Student: Role.Student,
} as const;
