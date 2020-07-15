const customer = require('./../routes/customer')
const movieRouter = require('./../routes/movie')
const rentalRouter = require('./../routes/rental')
const userRouter = require('./../routes/users')
const authRoute = require('./../routes/auth')
const courses = require('./../routes/courses')
const genres = require('./../routes/genres')
const logger = require('node-color-log');

function route(app){
    app.use(function (request , response , next){
        logger.info('Authorising...')
        next()
    })
    app.use('/api/courses' , courses)
    app.use('/api/genres', genres)
    app.use('/api/customer', customer)
    app.use('/api/movie' , movieRouter)
    app.use('/api/rental', rentalRouter)
    app.use('/api/user' , userRouter)
    app.use('/api/auth' , authRoute)
}

module.exports.route = route