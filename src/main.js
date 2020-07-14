const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose')
const express = require('express')
const courses = require('./routes/courses')
const genres = require('./routes/genres')
const helmet = require('helmet')
const logger = require('node-color-log');
const customer = require('./routes/customer')
const movieRouter = require('./routes/movie')
const rentalRouter = require('./routes/rental')
const userRouter = require('./routes/users')
const Fawn = require('fawn')
Fawn.init(mongoose)

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))  //key=value&key=value
app.use(express.static('src/public'))
app.use(helmet())
mongoose.connect('mongodb://localhost/vidly')
    .then(()=> logger.info('Connected to MongoDB...'))
    .catch(error => logger.error('Database is not connected '+error))


app.use('/api/courses' , courses)
app.use('/api/genres', genres)
app.use('/api/customer', customer)
app.use('/api/movie' , movieRouter)
app.use('/api/rental', rentalRouter)
app.use('/api/user' , userRouter)

app.use( (request, response , next)=>{
    console.log('Authenticating....')
    next()
})

//PORT
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`listening port ${port}`)
})


