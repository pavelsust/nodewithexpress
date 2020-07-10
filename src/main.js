const config = require('config')
const express = require('express')
const courses = require('./routes/courses')
const home = require('./routes/home')
const genres = require('./genres/genres')

const debug = require('debug')('app:startup')
const logging = require('./middleware/logger')
const helmet = require('helmet')
const morgan = require('morgan')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))  //key=value&key=value
app.use(express.static('src/public'))
app.use(helmet())


app.use('/api/courses' , courses)
app.use('/api/genres', genres)
app.use('/', home)


app.use( (request, response , next)=>{
    console.log('Authenticating....')
    next()
})



//PORT
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`listening port ${port}`)
})


