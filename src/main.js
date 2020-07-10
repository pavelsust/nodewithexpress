const express = require('express')
const app = express()
app.use(express.json())


const courses = [{
    id: 1,
    "courseName": 'pavel'
}, {id: 2, "courseName": 'pavel'}, {id: 3, "courseName": 'pavel'}, {id: 4, "courseName": 'pavel'},
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
