import { User } from "./User";

export type Comment = {
  comment: string;
  reactions: string[];
  createdAt: string;
} & User;

export type Content = {
  _id?: string;
  owner: User;
  title: string;
  description: string;
  comments: Comment[];
  createdAt: string;
};
