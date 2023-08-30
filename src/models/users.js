const mongoose = require('mongoose')

// Schema
const usersSchema = new mongoose.Schema({
    name:String,
    password:String,
})

// model
const User = mongoose.model('User', usersSchema);

module.exports = User