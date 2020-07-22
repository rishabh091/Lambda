const User = require('../modals/userModal')
const bcrypt = require('bcrypt')

const OTP = require('./otp')
const mail = require('./mail')

const add = (data) => {
    const user = new User(data)
    user.password = bcrypt.hashSync(user.password, 10)
    user.accountCreated = new Date()
    return User.create(user)
}

const getUserByEmail = async (email) => {
    return await User.findOne({email: email})
}

const getUserById = async (id) => {
    return await User.findById(id)
}

const sendOTP = async (email) => {
    const otp = OTP.generateOTP()
    mail.sendMail(email, otp)

    console.log('OTP : ' + otp)
    return otp
}

module.exports = {
    add: add,
    getUserByEmail: getUserByEmail,
    getUserById: getUserById,
    sendOTP: sendOTP
}