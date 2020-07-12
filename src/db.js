const mongoose = require('mongoose')
const winston = require('winston');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.log('Could not connect to db ' + error))

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: {service: 'user-service'}
});

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
})
const Course = mongoose.model('Course', courseSchema)
//createCourse()

async function createCourse() {
    const course = new Course({
            name: 'Angular Course',
            author: 'pavel',
            tags: ['node', 'frontend'],
            isPublished: true
        }
    )
    const result = await course.save();
    //console.log(result)
    logger.info('hello logger' + result)
}

getCourses()

async function getCourses() {
    // eq = equal
    // ne = not equal
    // gt = greater than
    // gte = greater than or equal
    // lt = less than
    // lte = less than or equal to
    // nin = not in
    // in =

    // const courses = await Course.find({
    //     //price:{ $gte: 10 , $lte:20}
    //     price:{ $in : [10 , 15 , 20]}
    // })
    //     .limit(10)
    //     .sort({name:1})
    //     .select({name:1 , tags:1})
    //     .then(args => logger.info(args))


    ///logical operator

    // or
    // and



    // // starts with Mosh
    // .find({author: /^Mosh/})
    //
    // // Ends with Mosh
    //     .find({author: /Hamedani$/i})
    //
    //  Contains Mosh  .find({author: /.*Mosh.*/i})



    // count the total document
    //.count()

    // const courses = await Course.find()
    //
    //
    //     // start
    //     //.find({author: /Hamedani$/i })
    //     //.find({author: /.*Mosh.*/i})
    //     //.or([{author: 'Mosh'}, {isPublished:true}])
    //     //.and([ ])
    //     //.limit(10)
    //     //.sort({name:1})
    //     //.select({name:1 , tags:1})
    //     .count()
    //     .then(args => logger.info(args))

    const pageNumber = 2
    const pageSize = 10
    const courses = await Course
        .findById('5f09f8351760560846e2e3e5')
        //.find()
        //.skip((pageNumber-1)*pageSize)
        //.limit(pageSize)
        .then(args => logger.info(args))

}