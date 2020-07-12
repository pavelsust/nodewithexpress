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
    name: {type: String, required: true,
    minlength: 5,
    maxlength: 255,
    },
    category:{
        type:Array,
        enum:['web' , 'mobile' , 'network'],
        required:true
    },
    author: String,
    isPublished: Boolean,
    price: {
        type: Number,
        min:10,
        max:200,
        required:  function (){
            logger.info(this.isPublished)
            return this.isPublished}
    },
    tags: {
        type:Array,
        validate:{
            validator: function (v){
                return v.length>0
            },
            message: 'Course should have at least one tag'
        }
    },

    date: {type: Date, default: Date.now}

})

let Courses = mongoose.model("courses", courseSchema)


createCourse()

async function createCourse() {
    let course = new Courses({
        name: 'pavel',
        author: 'pavel',
        price: 10,
        isPublished: true,
        category:['web' , 'mobile'],
        tags: []
    })
    try {
        let result = await course.save()
        logger.info(result)
    } catch (e) {
        logger.info(e)
    }

}