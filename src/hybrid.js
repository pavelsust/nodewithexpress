const mongoose = require('mongoose')
const logger = require('node-color-log');

const {Genre, GenreSchema} = require('./model/genres-model')

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));


const movieSchema = new  mongoose.Schema({
    title:String,
    genre: {
        type:GenreSchema,
        ref:'genre'
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


//createMovie('Bindas ' , new Genre({_id :'5f0c0bf5a7e4780649040535' ,name:'threller'}))

async function createMovie(title ,genre){
    let movie = new Movie({
        title:title,
        genre:genre
    })

    let result = await movie.save()
    logger.info(result)
}
showList()
async function showList(){
    let result = await Movie.findById('5f0c68667a17d82361a716eb')
        //.select('title genre.name')
        .populate('genre'  , 'genre._id')
    logger.info(result)
}