require("dotenv").config();
const { PORT } = process.env;

// conexion con el server
const server = require("./src/app");

// conectamos con mongo
const connection = require("./src/db");

connection()

try {
  server.listen(PORT, () => console.log(`server on port ${PORT}`))
} catch (error) {
  console.log(error);
}

