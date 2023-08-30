import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv/config";

// Crear el servidor y puerto
const server = express();
const PORT = process.env.PORT || 6000;

const main = async () => {
  try {
    // conexión DB
    await mongoose.connect(process.env.DBMONGOOSE);
    console.log('DB ok');

    // Shema
    const clientesZapatosShema = new mongoose.Schema({
      name: {
        type: String,
        required: true,
      },
    });

    // Model
    const ClienteZpatos = mongoose.model('ClienteZapato', clientesZapatosShema)

    // Rutas
    server.get("/clientes", async (req, res) => {
        try {
            // obtener todos los documentos
            const clientes = await ClienteZpatos.find();
            res.status(200).json(clientes)
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: error.message})        
        }
    });
  } catch (error) {
    console.log(error);
  }
};

// middlewares
server.use(express.json());
server.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});

// Ejecutar la DB
main();
