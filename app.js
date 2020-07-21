const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')

//connect to mongodb atlas
mongoose.connect('mongodb+srv://Rishabh:' + process.env.PASSWORD + '@cluster0.4bbqk.mongodb.net/Lambda?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then((result) => {
    console.log('Lambda connected to MongoDB Atlas.')
})
.catch((err) => {
    console.log(err)
})

//userRouter
const userRoutes = require('./routes/userRoutes')
app.use(userRoutes)

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