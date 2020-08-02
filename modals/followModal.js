const mongoose = require('mongoose')
const User = require('./userModal')

const followSchema = new mongoose.Schema({
    personYouFollow:  {
        type: Object,
        required: true
    },
    you: {
        type: Object,
        required: true
    },
    accepted: {
        type: Boolean,
        required: true
    }
})

const Follow = mongoose.model('Follow', followSchema)

module.exports = Follow