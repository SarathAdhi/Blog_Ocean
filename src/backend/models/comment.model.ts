// UserModel is not used anywhere, but import to Import
// else Schema error is thrown
const UserModel = require("../models/user.model");
import { Schema, model, models } from "mongoose";

const Comment = new Schema({
  title: {
    type: String,
    required: true,
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

const CommentModel = models.Comment || model("Comment", Comment);

export default CommentModel;
