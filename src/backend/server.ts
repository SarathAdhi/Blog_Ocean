import mongoose from "mongoose";

const db = async () => mongoose.connect(process.env.MONGODB_URL!);

export default db;
