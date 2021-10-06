const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    id: String,
    name: String,
    avatarUrl: String,
    phone: String,
    email: String,
    birthday: String
})

const User = mongoose.model('User', userSchema)

module.exports = User