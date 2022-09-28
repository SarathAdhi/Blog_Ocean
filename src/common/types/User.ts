export type NewUser = {
  email: string;
  image: string;
  name: string;
};

export type User = {
  _id?: string;
  username: string;
  bio: string;
  followers: User[];
  following: User[];
} & NewUser;
