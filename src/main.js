const express = require('express')
const Joi = require('joi')
const app = express()
app.use(express.json())

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
    if (error) {
        response.status(400).send(error.details[0].message)
        return;
    }

    let course = {id: courses.length + 1, "name": request.body.name}
    courses.push(course)
    response.send(course)

})

app.get('/api/courses/:id', (request, response) => {

    console.log('' + request.params.id)
    let courseResult = courses.find(args => args.id === parseInt(request.params.id))


    // 404 object not found

    if (!courseResult) response.status(404).send('The course with given id not found')
    response.send(courseResult)
})


app.put('/api/courses/:id', (request, response) => {
    // Look up the course
    let courseResult = courses.find(args => args.id === parseInt(request.params.id))
    if (!courseResult) {
        response.status(404).send('The given course is not found')
        return
    }

    let {error} = validateCourse(request.body)
    if (error) {
        response.status(400).send(error.details[0].message)
        return;
    }

    courseResult.name = request.body.name
    response.send(courseResult)

    // return updated course
})

app.delete('/api/courses/:id' , (request , response) =>{
    //Look up the course
    // Not exisit , return 404
    let courseResult = courses.find(args => args.id === parseInt(request.params.id))
    if (!courseResult) {
        response.status(404).send('The given course is not found')
        return
    }

    // delete part
    let index = courses.indexOf(courseResult)
    courses.splice(index , 1)

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
