const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const config = require('config')
const winston = require('winston')
require('winston-mongodb')
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
const authRoute = require('./routes/auth')
const Fawn = require('fawn')
Fawn.init(mongoose)

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))  //key=value&key=value
app.use(express.static('src/public'))
app.use(helmet())

if (!config.get('jwtPrivateKey')){
    logger.info('FATAL ERROR : jwtPrivateKey is not defined')
    process.exit(1)
}

mongoose.connect('mongodb://localhost/vidly')
    .then(()=> logger.info('Connected to MongoDB...'))
    .catch(error => logger.error('Database is not connected '+error))


winston.add(winston.transports.MongoDB, {db: 'mongodb://localhost/vidly'})


app.use('/api/courses' , courses)
app.use('/api/genres', genres)
app.use('/api/customer', customer)
app.use('/api/movie' , movieRouter)
app.use('/api/rental', rentalRouter)
app.use('/api/user' , userRouter)
app.use('/api/auth' , authRoute)

//PORT
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`listening port ${port}`)
})


