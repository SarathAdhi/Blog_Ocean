import { User } from "./User";

export type Reaction = {
  _id?: "string";
  user: User;
  emoji: string;
};

export type Comment = {
  _id: string;
  owner: User;
  comment: string;
  reactions: Reaction[];
  createdAt: string;
};

export type Content = {
  _id?: string;
  owner: User;
  title: string;
  description: string;
  comment: { _id: string; comments?: Comment[] };
  likes: User[];
  createdAt: string;
};
