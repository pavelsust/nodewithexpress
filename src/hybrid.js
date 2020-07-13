const mongoose = require('mongoose')
const logger = require('node-color-log');

const {Genre, GenreSchema} = require('./module/genres-model')

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));


const movieSchema = new  mongoose.Schema({
    title:String,
    genre: {
        type:GenreSchema,
        ref:''
    }
})



const Movie = mongoose.model('movie' , movieSchema)



// let movie = new Movie({
//     title: req.body.title,
//     genre: {
//         _id: genre._id,
//         name: genre.name
//     },
//     numberInStock: req.body.numberInStock,
//     dailyRentalRate: req.body.dailyRentalRate
// });


createMovie('Avatar ' , new Genre({name:'threller'}))

async function createMovie(title ,genre){
    let movie = new Movie({
        title:title,
        genre:genre
    })

    let result = await movie.save()
    logger.info(result)
}
