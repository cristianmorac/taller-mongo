import express from "express";
import cors from "cors";
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv/config";

const server = express();
const PORT = 4000;
const { MONGODB } = process.env;

server.use(express.json());
server.use(cors());

async function main() {
  try {
    // connection db
    await mongoose.connect(MONGODB);

    // Schema
    // User Schema
    const UserSchema = new mongoose.Schema({
      name: String,
      email: String,
      // likedPosts array de Post type ObjectID
    });

    const User = mongoose.model("User", UserSchema);

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

    const Post = mongoose.model('Post', PostSchema);

    // Rutas
    // Rutas de User
    // obtener usuarios
    server.get("/users", async (req, res) => {
      try {
        const users = await User.find();
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ msg: error.message });
      }
    });

    // crear usuarios
    server.post("/users", async (req, res) => {
      try {
        const newUser = req.body;
        const user = new User(newUser);
        const savedUser = await user.save();
        res.status(201).json({ msg: "Usuario creado", savedUser });
      } catch (error) {
        res.status(500).json({ msg: error.message });
      }
    });

    // Actualizar usuario patch: actualiza los parametros que le enviemos
    server.patch("/users/:id", async (req, res) => {
      const { id } = req.params;
      const userFields = req.body;

      // new:true => devuelve el documento actualizado
      try {
        const updateUser = await User.findByIdAndUpdate(id, userFields, {
          new: true,
        });

        if (!updateUser) {
          return res.status(404).json("User not found");
        }

        res.status(201).json({ msg: "Usuario actualizado", updateUser });
      } catch (error) {
        res.status(500).json({ msg: error.message });
      }
    });

    // Eliminar usuario
    server.delete("/users/:id", async (req, res) => {
      const { id } = req.params;
      try {
        const deleteUser = await User.findByIdAndRemove(id)

        if (!deleteUser) {
          return res.status(404).json({ msg: 'User not found' });
        }

        res.status(200).json({ msg: "Usuario eliminado", deleteUser });

      } catch (error) {
        if (error.message.includes('Cast to ObjectId failed for value')) {
          return res.status(400).json({ msg: 'id incorrecto' });
        }
        res.status(500).json({ msg: error.message });
      }
    });

    // Rutas del Post
    // Obtener Post
    server.get("/Posts", async (req, res) => {
      try {
        const posts = await Post.find().populate('auth');
        res.status(200).json(posts);
      } catch (error) {
        res.status(500).json({ msg: error.message });
      }
    });

    // crear usuarios
    server.post("/Posts", async (req, res) => {
      try {
        const newPost = req.body;
        const post = new Post(newPost);
        const savedpost = await post.save();
        res.status(201).json({ msg: "Post creado", savedpost });
      } catch (error) {
        res.status(500).json({ msg: error.message });
      }
    });

    // Actualizar usuario patch: actualiza los parametros que le enviemos
    server.patch("/Posts/:id", async (req, res) => {
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

        res.status(201).json({ msg: "Post actualizado", updatePost });
      } catch (error) {
        res.status(500).json({ msg: error.message });
      }
    });

    // Eliminar usuario
    server.delete("/Posts/:id", async (req, res) => {
      const { id } = req.params;
      try {
        const deletePost = await Post.findByIdAndRemove(id)

        if (!deleteUser) {
          return res.status(404).json({ msg: 'Post not found' });
        }

        res.status(200).json({ msg: "Post eliminado", deletePost });

      } catch (error) {
        if (error.message.includes('Cast to ObjectId failed for value')) {
          return res.status(400).json({ msg: 'id incorrecto' });
        }
        res.status(500).json({ msg: error.message });
      }
    });

    // levantar el servidor
    server.listen(PORT, () => {
      console.log("Server ok");
    });
  } catch (error) {
    console.log(error);
  }
}

main();
