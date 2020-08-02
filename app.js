const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
const cors = require('cors')

//connect to mongodb atlas
mongoose.connect('mongodb+srv://Rishabh:' + process.env.PASSWORD + '@cluster0.4bbqk.mongodb.net/Lambda?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then((result) => {
    console.log('Lambda connected to MongoDB Atlas.')
})
.catch((err) => {
    console.log(err)
})

let corsConfig = {
    origin: (origin, callback) => {
        const url = "app-lambda"

        if(origin == undefined || origin.includes(url) || origin.includes('localhost:4200')) {
            callback(null, true)
        }
        else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
app.use(cors(corsConfig))

//userRouter
const userRoutes = require('./routes/userRoutes')
app.use(userRoutes)

//followRouter
const followRoutes = require('./routes/followRoutes')
app.use(followRoutes)

//starting server
const server = app.listen(process.env.PORT || 8080, () => {
    console.log('Lambda server started at port : ' + server.address().port)
    console.log('Address : ' + server.address().address)
})

//test api
app.get('/test', (req, res) => {
    console.log('Test Fired')
    res.send('Hello World')
})