import mongoose from "mongoose";

// Post Schema
const PostSchema = new mongoose.Schema({
    title: String,
    content: String,
    // asociación 1:M
    auth: {
      // especificar id
      type: mongoose.Schema.Types.ObjectId,
      // asociación modelo User
      ref: "User",
    } 
  });

export const Post = mongoose.model('Post', PostSchema);