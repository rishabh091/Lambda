const Follow = require('../modals/followModal')
const User = require('../modals/userModal')

const follow = async (you, user) => {
    let youObject
    let userObject

    const youPromise = User.findById(you)
    const userPromise = User.findById(user)
    
    await Promise.all([youPromise, userPromise])
    .then((value) => {
        youObject = value[0]
        userObject = value[1]
    })
    .catch(err => {
        return new Error(err)
    })

    const follow = {
        you: userObject,
        personYouFollow: youObject,
        accepted: false
    }

    const object = new Follow(follow)
    return Follow.create(object)
}

module.exports = {
    follow: follow
}