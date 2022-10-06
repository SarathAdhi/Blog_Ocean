// UserModel is not used anywhere, but import to Import
// else Schema error is thrown
const UserModel = require("../models/user.model");
import { Schema, model, models } from "mongoose";

const Content = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  likes: {
    type: [Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  comments: [
    {
      owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
      comment: { type: String, required: true },
      reactions: [
        {
          user: { type: Schema.Types.ObjectId, ref: "User" },
          emoji: { type: String, required: true },
        },
      ],
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ContentModel = models.Content || model("Content", Content);

export default ContentModel;
