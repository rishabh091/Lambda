const nodemailer = require('nodemailer')
const fs = require('fs')

const dotenv = require('dotenv')
dotenv.config()

const sendMail = (email, otp) => {
    const content = fs.readFileSync('static/mail.html').toString('utf-8')
    .replace('{otp}', otp)

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAILPASSWORD
        }
    })

    let mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Lambda - Email Verification",
        text: content
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            console.log(err)
        }
        else {
            console.log('Email sent to ' + email)
            console.log('Response : ' + info.response)
        }
    })
}

module.exports = {
    sendMail: sendMail
}