import { Router } from "express";
import { User } from '../models/user.js'
export const userRouter = Router();

// Rutas de User
// obtener usuarios
userRouter.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

userRouter.get("/:id", async (req, res) => {
    try {
        const {id} = req.params
        const userFound = await User.find({_id:id});

        if (!userFound) {
            // end no envia nada
            return res.status(404).end();
        }

        res.status(200).json(userFound)
    } catch (error) {
        next(error) // cuando recibe un parametro se toma al inicio de la función
    }
  });

// crear usuarios
userRouter.post("/", async (req, res) => {
  try {
    const newUser = req.body;
    const user = new User(newUser);
    const savedUser = await user.save();
    res.status(201).end();
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Actualizar usuario patch: actualiza los parametros que le enviemos
userRouter.patch("/:id", async (req, res) => {
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

    res.status(201).end();
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Eliminar usuario
userRouter.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleteUser = await User.findByIdAndRemove(id);

    if (!deleteUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).end();
  } catch (error) {
    next(error)
  }
});
