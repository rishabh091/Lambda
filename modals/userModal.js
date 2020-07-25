const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    userName: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    accountCreated: Date,
    bio: {
        type: String,
        maxlength: 255
    },
    profilePicture: {
        type: String,
        data: Buffer,
        maxlength: 8000
    },
    gender: String
})

const User = mongoose.model('User', userSchema)

module.exports = User