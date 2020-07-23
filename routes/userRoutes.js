const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
dotenv.config()

const jwt = require('jsonwebtoken')

//service we created
const userService = require('../services/userService')
const jwtVerify = require('../config/jwtVerify')

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

router.post('/login', bodyParser.json(), async (req, res) => {
    const user = await userService.getUserByEmail(req.body.email);

    if(user == null) {
        res.status(403).send('\"Incorrect Email or Password\"')
    }
    
    if(!bcrypt.compareSync(req.body.password, user.password)) {
        res.status(403).send('\"Access Denied\"')
    }
    
    //create and assign a token
    const token = jwt.sign({
        id: user._id
    }, process.env.SECRET)
    
    res.status(200).send({ token: token })
})

router.post("/otp", bodyParser.json(), (req, res) => {
    userService.sendOTP(req.body.email)
    .then((otp) => {
        res.status(200)
        res.send(JSON.stringify(otp))
    })
    .catch((err) => {
        res.status(500)
        res.send(err)
    })
})

//demo
router.get('/testAuth', jwtVerify, (req, res) => {
    res.send('Authenticated')
})

module.exports = router