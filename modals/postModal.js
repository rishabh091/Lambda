const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    picture: {
        type: String,
        data: Buffer,
        required: true,
        maxlength: 9000
    },
    caption: {
        type: String,
        maxlength: 255
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post