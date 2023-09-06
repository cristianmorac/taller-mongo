import mongoose from "mongoose";


// User Schema
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    // likedPosts array de Post type ObjectID
  });

export const User = mongoose.model("User", UserSchema);