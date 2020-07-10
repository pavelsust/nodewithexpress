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

app.get('/api/post/:year/:month' , (request , response)=>{
    console.log(request.query)
})


app.post('/api/courses' , (request , response)=>{

    const schema = {
        name: Joi.string().min(3).required()
    }

    let result = Joi.validate(request.body, schema)
    if (result.error){
        response.code(400).send(result.error)
        return;
    }

    let course = {id:courses.length+1 ,"name": request.body.name}
    courses.push(course)
    response.send(course)


})

app.get('/api/courses/:value' , (request , response)=>{

    console.log(''+ request.params.value)
    let courseResult = courses.find(args => args.id===parseInt(request.params.value))
    // 404 object not found

    if (!courseResult)  response.status(404).send('The course with given id not found')
    response.send(courseResult)
})


//PORT
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`listening port ${port}`)
})
