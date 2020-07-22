const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config()

const passport = require('passport')
const session = require('express-session')
const flash = require('express-flash')

//service we created
const userService = require('../services/userService')

//custom initialize function we created
const initializePassport = require('../config/passport.config')
initializePassport(passport)

router.use(flash())
router.use(session({
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false
}))
router.use(passport.initialize())

router.post('/register', bodyParser.json(), (req, res) => {
    const user = req.body
    userService.add(user)
    .then((result) => {
        console.log(user.name + " registered")

        res.status(200)
        res.send(true)
    })
    .catch((err) => {
        res.status(500)
        res.send(err)
    })
})

router.post('/login', bodyParser.json(), passport.authenticate('local'), async (req, res) => {
    console.log('User ' + req.body.email + " logged in")
    res.send('Authorized')
})

router.delete('/logout', async (req, res) => {
    req.logOut()
    console.log('User logged out')
    res.send('logged out')
})

router.post("/otp", bodyParser.json(), (req, res) => {
    userService.sendOTP(req.body.email)
    .then((otp) => {
        res.status(200)
        res.send(otp)
    })
    .catch((err) => {
        res.status(500)
        res.send(err)
    })
})

module.exports = router