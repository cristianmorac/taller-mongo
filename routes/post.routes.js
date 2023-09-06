import { Router } from "express";
import {Post} from '../models/post.js'
export const postRouter = Router();

// Rutas del Post
// Obtener Post
postRouter.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("auth");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

postRouter.get("/:id", async (req, res) => {
  try {
    const posts = await Post.find({_id:id}).populate("auth");
    res.status(200).json(posts);
  } catch (error) {
    next(error)
  }
});

// crear usuarios
postRouter.post("/", async (req, res) => {
  try {
    const newPost = req.body;
    const post = new Post(newPost);
    const savedpost = await post.save();
    res.status(201).end();
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Actualizar usuario patch: actualiza los parametros que le enviemos
postRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const userFields = req.body;

  // new:true => devuelve el documento actualizado
  try {
    const updatePost = await Post.findByIdAndUpdate(id, userFields, {
      new: true,
    });

    if (!updateUser) {
      return res.status(404).json("Post not found");
    }

    res.status(201).end();
  } catch (error) {
    next(error)
  }
});

// Eliminar usuario
postRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletePost = await Post.findByIdAndRemove(id);

    if (!deleteUser) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.status(200).end();
  } catch (error) {
    next(error)
  }
});
