const config = require('config')
const express = require('express')
const Joi = require('joi')
const logging = require('./logger')
const helmet = require('helmet')
const morgan = require('morgan')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))  //key=value&key=value
app.use(express.static('src/public'))
app.use(helmet())



// Configuration
console.log('Application name'+config.get('name'))
console.log('Application '+config.get('mail.host'))

if (app.get('env')=== 'development'){
    app.use(morgan('tiny'))
    console.log('Morgan enable')
}

//app.use(logging.log())

//console.log(`${process.env.NODE_ENV}`) // get the enviourment
//let env= app.get('env') // get the enviorment value
//console.log(env)

app.use( (request, response , next)=>{
    console.log('Authenticating....')
    next()
})

const courses = [{
    id: 1,
    "name": 'pavel'
}, {id: 2, "name": 'pavel'}, {id: 3, "name": 'pavel'}, {id: 4, "name": 'pavel'},
]
app.get('/', (request, response) => {
    response.send('hello world!!!!!')
})

app.get('/api/courses', (request, response) => {
    response.send(courses)
})

app.get('/api/post/:year/:month', (request, response) => {
    console.log(request.query)
})

app.post('/api/courses', (request, response) => {

    let {error} = validateCourse(request.body)
    if (error) return response.status(400).send(error.details[0].message)

    let course = {id: courses.length + 1, "name": request.body.name}
    courses.push(course)
    response.send(course)

})

app.get('/api/courses/:id', (request, response) => {

    console.log('' + request.params.id)
    let courseResult = courses.find(args => args.id === parseInt(request.params.id))

    if (!courseResult) response.status(404).send('The course with given id not found')
    response.send(courseResult)
})


app.put('/api/courses/:id', (request, response) => {
    // Look up the course
    let courseResult = courses.find(args => args.id === parseInt(request.params.id))
    if (!courseResult) return response.status(404).send('The given course is not found')

    let {error} = validateCourse(request.body)
    if (error) return response.status(400).send(error.details[0].message)

    courseResult.name = request.body.name
    response.send(courseResult)

})

app.delete('/api/courses/:id', (request, response) => {
    //Look up the course
    // Not exisit , return 404
    let courseResult = courses.find(args => args.id === parseInt(request.params.id))
    if (!courseResult) return response.status(404).send('The given course is not found')
    // delete part
    let index = courses.indexOf(courseResult)
    courses.splice(index, 1)

    //response.send(courseResult)

    console.log(courses)
    response.status(200).send(courseResult)

})


//PORT
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`listening port ${port}`)
})


function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course, schema)
}
