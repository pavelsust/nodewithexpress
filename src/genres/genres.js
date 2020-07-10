const express = require('express')
const router = express.Router()
const Joi = require('joi')



const genresList = [{
    id: 1, "name": 'Action'},
    {id: 2, "name": 'Horror'},
    {id: 3, "name": 'Romance'}
]


router.get('/', (request, response) => {
    response.send(genresList)
})

router.post('/', (request, response) => {

    let {error} = validateCourse(request.body)
    if (error) return response.status(400).send(error.details[0].message)

    let course = {id: genresList.length + 1, "name": request.body.name}
    genresList.push(course)
    response.send(course)

})

router.get('/:id', (request, response) => {

    console.log('' + request.params.id)
    let courseResult = genresList.find(args => args.id === parseInt(request.params.id))

    if (!courseResult) response.status(404).send('The course with given id not found')
    response.send(courseResult)
})


router.put('/:id', (request, response) => {
    // Look up the course
    let courseResult = genresList.find(args => args.id === parseInt(request.params.id))
    if (!courseResult) return response.status(404).send('The given course is not found')

    let {error} = validateCourse(request.body)
    if (error) return response.status(400).send(error.details[0].message)

    courseResult.name = request.body.name
    response.send(courseResult)

})

router.delete('/:id', (request, response) => {
    //Look up the course
    // Not exisit , return 404
    let courseResult = genresList.find(args => args.id === parseInt(request.params.id))
    if (!courseResult) return response.status(404).send('The given course is not found')
    // delete part
    let index = genresList.indexOf(courseResult)
    genresList.splice(index, 1)

    //response.send(courseResult)

    console.log(genresList)
    response.status(200).send(courseResult)

})

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course, schema)
}


module.exports = router