import CommentModel from "@backend/models/comment.model";
import ContentModel from "@backend/models/content.model";
import db from "@backend/server";
import { Comment, Content } from "types/Content";
import { User } from "types/User";

export const createContent = async (body: User) => {
  await db();
  return ContentModel.create(body);
};

export const createComment = async (title: Content["title"]) => {
  await db();
  return CommentModel.create({ title });
};

export const contentFilter = async (filter: any) => {
  await db();
  return await ContentModel.find(filter);
};

export const getContents = async () => {
  await db();
  return await ContentModel.find({})
    .populate("owner")
    .sort({ createdAt: -1 })
    .exec();
};

export const getContentById = async (_id: User["_id"]) => {
  await db();

  let content = await ContentModel.findOne({ _id }).populate("owner").exec();

  content = await content.populate("owner.followers");
  content = await content.populate("likes");
  // content = await content.populate("comments");
  // content = await content.populate("comments.owner");

  return content;
};

export const getContentsByUserId = async (owner: User["_id"]) => {
  await db();
  // it should be find and not findOne
  return await ContentModel.find({ owner })
    .populate("owner")
    .sort({ createdAt: -1 });
};

export const updateContent = async (_id: Content["_id"], update: any) => {
  await db();

  const filter = { _id };
  const content = await ContentModel.findOneAndUpdate(filter, update)
    .populate("owner")
    .populate("likes");
  return await content;
};

export const getCommentById = async (_id: Comment["_id"]) => {
  await db();

  return await CommentModel.findOne({ _id })
    .sort({
      "comments.createdAt": -1,
    })
    .populate("comments.owner");
};

export const updateComments = async (filter: any, update: any) => {
  await db();

  return await CommentModel.updateOne(filter, update);
};

export const commentFilter = async (filter: any) => {
  await db();
  return await CommentModel.find(filter);
};
