const mongoose = require('mongoose')
const winston = require('winston');
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: {service: 'user-service'}
});


/// database connection
mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => logger.info('Connected to mongodb database'))
    .catch(error => logger.info('could not connect to db '+error))

let courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    price: Number,
    isPublished: Boolean,
    tags: [String],
    date: {type:Date, default: Date.now}
})

let Courses = mongoose.model("courses" , courseSchema)

getCourses()
async function getCourses(){
    await Courses.find({
        author: /.*jack.*/i,
        price: 12,
        isPublished:true
    })
        .then(args => logger.info(args))
}