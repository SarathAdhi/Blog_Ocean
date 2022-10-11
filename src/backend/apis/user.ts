import UserModel from "@backend/models/user.model";
import db from "@backend/server";
import { NewUser, User } from "types/User";
import jwt_decode from "jwt-decode";

export type JWT_Decode = {
  email: string;
  name: string;
  picture: string;
};

export const decodeToken = async (token: string) => {
  const decoded: JWT_Decode = await jwt_decode(token!);

  const user = {
    email: decoded.email,
    name: decoded.name,
    image: decoded.picture,
  };

  return user;
};

export const createUser = async (body: NewUser) => {
  await db();
  return await UserModel.create({ ...body });
};

export const getUsers = async () => {
  await db();
  return await UserModel.find();
};

export const userFilter = async (filter: any) => {
  await db();
  return await UserModel.find(filter);
};

export const getUserById = async (id: User["_id"]) => {
  await db();
  return await UserModel.findById(id).populate("followers");
};

export const getUserByEmail = async (email: User["email"]) => {
  await db();
  return await UserModel.findOne({ email }).populate("followers");
};

export const getUserByUsername = async (username: User["username"]) => {
  await db();
  return await UserModel.findOne({ username }).populate("followers");
};

export const updateUserProfile = async (_id: User["_id"], update: any) => {
  await db();

  const filter = { _id };
  return await UserModel.findOneAndUpdate(filter, update).populate("followers");
};
