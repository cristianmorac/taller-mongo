const mongoose = require('mongoose')

// Schema
const usersSshema = new mongoose.Schema({
    name:String,
    password:String,
})

// model
const User = mongoose.model('User', usersSshema);

module.exports = User