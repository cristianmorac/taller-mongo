const express = require('express');
require('./db')
const server = express();
server.name = 'Mongo-express'

// configuraciones de express
server.use(express.urlencoded({extended:false}))
server.use(express.json());


// conectar las rutas
const routes = require('./routes/index.routes')
server.use('/', routes)

module.exports = server