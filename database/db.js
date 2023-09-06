import mongoose from "mongoose";
import dotenv from "dotenv/config";

const { DBMONGOOSE } = process.env;

export const dbConnect = async () => {
    await mongoose.connect(DBMONGOOSE);
}

