const router = require('express').Router()
const jwtVerify = require('../config/jwtVerify')

const followService = require('../services/followService')

router.get('/follow', jwtVerify, (req, res) => {
    const you = req.query.you
    const user = req.query.user

    followService.follow(you, user)
    .then(result => {
        console.log('Request sent')
        res.status(200).send(true)
    })
    .catch(err => {
        console.log(err)
        res.status(501).send(err)
    })
})

module.exports = router