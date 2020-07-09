
const express = require('express')
const app = express()
app.get('/', (request , response) =>{
    response.send('hello world!!!!!')
})

app.get('/api/courses', (request , response) =>{
    response.send([1 ,2 , 3])
})



//PORT
const port = process.env.PORT|| 3000
app.listen(port, ()=>{
    console.log(`listening port ${port}`)
})
