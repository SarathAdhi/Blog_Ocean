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
});

const UserModel = models.User || model("User", User);

export default UserModel;
