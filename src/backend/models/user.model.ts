import { Schema, model, models } from "mongoose";

const User = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  following: {
    type: [Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },

  followers: {
    type: [Schema.Types.ObjectId],
    ref: "User",
    default: [],
    unique: true,
  },
});

const UserModel = models.User || model("User", User);

export default UserModel;
