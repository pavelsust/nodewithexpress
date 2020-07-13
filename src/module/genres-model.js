const mongoose = require('mongoose')
const GenreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
})

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course, schema)
}

module.exports.GenreSchema = GenreSchema
module.exports.validateCourse = validateCourse