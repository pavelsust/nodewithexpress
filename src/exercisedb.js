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
    _id: String,
    name: String,
    author: String,
    price: Number,
    isPublished: Boolean,
    tags: [String],
    date: {type: Date, default: Date.now}
})

let Courses = mongoose.model("courses", courseSchema)

//showResult()
async function showResult() {
    let result = await getCourses()
    logger.info(result)
}

async function getCourses() {
    return await Courses
        .find({id: '5a68fdd7bee8ea64649c2777'})
}

updateCourse('5a68fdd7bee8ea64649c2777')

async function updateCourse(id) {
    // Approach: Query first
    // findById()
    // Modify its properties
    // save()

    // Approach: Update first
    // Update directly


   let result = await Courses.updateMany({isPublished: false},{
       $set:{
           author : 'Another Author',
           price : 10
       }
   })
    logger.info(result)



    // let result = await Courses.findByIdAndUpdate(id, {
    //     $set: {
    //         author: 'Another Author',
    //         isPublished: false
    //     }
    // }, {new: true})
    // logger.info(result)

}


