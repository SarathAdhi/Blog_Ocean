import ContentModel from "@backend/models/content.model";
import db from "@backend/server";
import { User } from "types/User";

export const createContent = async (body: User) => {
  await db();
  return ContentModel.create(body);
};

export const getContents = async () => {
  await db();
  return await ContentModel.find({}).populate("owner");
};

export const getContentById = async (_id: User["_id"]) => {
  await db();
  const content = await ContentModel.findOne({ _id }).populate("owner");
  return await content.populate("owner.followers");
};

export const getContentsByUserId = async (owner: User["_id"]) => {
  await db();
  return await ContentModel.find({ owner }).populate("owner");
};
