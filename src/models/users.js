const mongoose = require('mongoose')

// Schema
const usersSchema = new mongoose.Schema({
    name:String,
    lastname: String,
    address: String,
    phone_number: String,
    birthdate: String,
    password:String,
})

// model
const User = mongoose.model('User', usersSchema);

module.exports = User