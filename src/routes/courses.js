const express = require('express')
const router = express.Router()
const Joi = require('joi')

const courses = [{
    id: 1,
    "name": 'pavel'
}, {id: 2, "name": 'pavel'}, {id: 3, "name": 'pavel'}, {id: 4, "name": 'pavel'},]


router.get('/', (request, response) => {
    response.send(courses)
})

router.post('/', (request, response) => {

    let {error} = validateCourse(request.body)
    if (error) return response.status(400).send(error.details[0].message)

    let course = {id: courses.length + 1, "name": request.body.name}
    courses.push(course)
    response.send(course)

})

router.get('/:id', (request, response) => {

    console.log('' + request.params.id)
    let courseResult = courses.find(args => args.id === parseInt(request.params.id))

    if (!courseResult) response.status(404).send('The course with given id not found')
    response.send(courseResult)
})


router.put('/:id', (request, response) => {
    // Look up the course
    let courseResult = courses.find(args => args.id === parseInt(request.params.id))
    if (!courseResult) return response.status(404).send('The given course is not found')

    let {error} = validateCourse(request.body)
    if (error) return response.status(400).send(error.details[0].message)

    courseResult.name = request.body.name
    response.send(courseResult)

})

router.delete('/:id', (request, response) => {
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

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course, schema)
}


module.exports = router