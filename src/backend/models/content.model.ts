import { Schema, model, models } from "mongoose";

const Content = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  comments: [
    {
      owner: { type: Schema.Types.ObjectId, ref: "User" },
      comment: { type: String },
      reactions: [String],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ContentModel = models.Content || model("Content", Content);

export default ContentModel;
