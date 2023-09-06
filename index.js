import express from "express";
import cors from "cors";
import dotenv from "dotenv/config";
import {dbConnect} from './database/db.js';
import { router } from "./routes/index.routes.js";
import {requestLogger} from './middlewares/requesLoger.js'
import { unknowEndpoint } from "./middlewares/unknownEndpoint.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const server = express();
const PORT = 4000;

// midlewares: funciones
server.use(express.json());
server.use(cors());
// middleware creado
server.use(requestLogger)

server.use('/api',router)


// orden de los middleware importa
server.use(unknowEndpoint)
server.use(errorHandler)

async function main() {
  try {
    // connection db
    await dbConnect();

    // Schema


    // Rutas

    // levantar el servidor
    server.listen(PORT, () => {
      console.log("Server ok");
    });
  } catch (error) {
    console.log(error);
  }
}

main();
