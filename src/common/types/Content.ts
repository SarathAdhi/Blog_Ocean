import { User } from "./User";

export type Comment = {
  _id?: string;
  owner: User;
  comment: string;
  reactions: string[];
  createdAt: string;
};

export type Content = {
  _id?: string;
  owner: User;
  title: string;
  description: string;
  comments: Comment[];
  likes: User[];
  createdAt: string;
};
