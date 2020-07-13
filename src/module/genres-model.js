const mongoose = require('mongoose')
const GenreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
})

const Genre = mongoose.model('genre', GenreSchema)

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course, schema)
}

module.exports.GenreSchema = GenreSchema
module.exports.Genre = Genre
module.exports.validateCourse = validateCourse