
const mongoose = require('mongoose')
const {GenreSchema} = require('./genres-model')
const Joi = require('joi');


const movieSchema = mongoose.Schema({
    title:{
        type:String,
    },
    genre: {
        type:GenreSchema,
        ref:'genre'
    },
    numberInStock: Number,
    dailyRentalRate:Number
})

const Movie =  mongoose.model('movie', movieSchema)

function validateMovie(movie){
    let schema={
        title: Joi.string().min(3).max(50).required(),
        genreID: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    }
    return Joi.validate(movie, schema)
}

module.exports.validateMovie = validateMovie
module.exports.Movie = Movie
module.exports.movieSchema = movieSchema