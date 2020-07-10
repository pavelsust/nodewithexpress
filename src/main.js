const config = require('config')
const express = require('express')
const courses = require('./routes/courses')
const home = require('./routes/home')

const debug = require('debug')('app:startup')
const logging = require('./logger')
const helmet = require('helmet')
const morgan = require('morgan')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))  //key=value&key=value
app.use(express.static('src/public'))
app.use(helmet())
app.use('/api/courses' , courses)
app.use('/', home)


// Configuration
console.log('Application name'+config.get('name'))
console.log('Application '+config.get('mail.host'))

console.log('Application name'+config.get('name'))
console.log('Mail password '+config.get('mail.password'))

if (app.get('env')=== 'development'){
    app.use(morgan('tiny'))
    debug('Morgan enabled ...')
}

debug('Connected to the database')

//app.use(logging.log())

//console.log(`${process.env.NODE_ENV}`) // get the enviourment
//let env= app.get('env') // get the enviorment value
//console.log(env)

app.use( (request, response , next)=>{
    console.log('Authenticating....')
    next()
})

app.get('/', (request, response) => {
    response.send('hello world!!!!!')
})



//PORT
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`listening port ${port}`)
})


