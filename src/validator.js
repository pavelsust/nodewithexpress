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
    .catch(error => logger.info('could not connect to db ' + error))

let courseSchema = new mongoose.Schema({
    name: {type: String, required: true},
    author: String,
    price: Number,
    isPublished: Boolean,
    tags: [String],
    date: {type: Date, default: Date.now}

})

let Courses = mongoose.model("courses", courseSchema)


createCourse()

async function createCourse() {
    let course = new Courses({
        //name: 'pavel',
        author: 'pavel',
        price: 10,
        isPublished: true
    })
    try {
        let result = await course.save()
        logger.info(result)
    } catch (e) {
        logger.info(e)
    }

}