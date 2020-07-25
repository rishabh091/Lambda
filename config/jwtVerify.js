const jwt = require('jsonwebtoken')

function auth(req, res, next) {
    const token = req.header('LambdaToken')

    if(!token) return res.status(403).send('\"Access Denied\"')

    try {
        const verified = jwt.verify(token, process.env.SECRET)
        req.user = verified
        next()
    }
    catch(e) {
        res.status(400).send('\"Invalid Token\"')
    }
}

module.exports = auth