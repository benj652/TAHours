/*
 * users.ts
 * defines the types for users
 */
import { ObjectId } from "mongodb";
import { NIL_OBJECT_ID } from "./misc";

// User type
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

// Config for roles
export const RolesConfig = {
  Professor: Role.Professor,
  Ta: Role.Ta,
  Admin: Role.Admin,
  Student: Role.Student,
} as const;

// Placeholder user
export const PLACEHOLER_USER: User = {
  //@ts-expect-error noitems
  _id: NIL_OBJECT_ID as ObjectId,
  accessToken: "",
  firstName: "",
  lastName: "",
  email: "",
  profilePic: "",
  description: "",
  roles: Role.Student,
};

export type UserChageDescriptionEventPayload = {
  updatedUser: User;
};

export type UserRoleChangeEventPayload = {
  newRole: string;
};
