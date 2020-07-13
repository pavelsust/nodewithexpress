const express = require('express')
const movieRouter = express.Router()
const logger = require('node-color-log');
const {Movie, validateMovie} = require('./../module/movie-module')
const {Genre} = require('./../module/genres-model')

movieRouter.get('/', async (request, response) => {
    let result = await Movie.find()
        .then(result => {
            if (!result) return response.status(404).send('Not found')
            response.send(result)
        })
        .catch(error => response.status(500).send(error))
})


movieRouter.post('/', async (request, response) => {

    let {error} = await validateMovie(request.body)
    if (error) return response.status(400).send(error.details[0].message)

    logger.info(JSON.stringify(request.body))

    let genre = await Genre.findById(request.body.genreID)
    if (!genre) return response.status(404)

    let movie = new Movie({
        title: request.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: request.body.numberInStock,
        dailyRentalRate: request.body.dailyRentalRate
    })

    let result = await movie.save()
    response.send(result)
    logger.info(result)
})

movieRouter.put('/:id', async (request, response) => {
    let {error} = validateMovie(request.body)
    if (error) return response.status(400).send(error.details[0].message)

    let genre = await Genre.findById(request.body.genreID)
    if (!genre) return response.status(404).send('invalid genre')

    let movie = await Movie.findByIdAndUpdate(request.params.id, {
        title: request.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: request.body.numberInStock,
        dailyRentalRate: request.body.dailyRentalRate
    }, {new: true})
        .then(result => {
            if (!result) response.status(500)
            response.send(result)
        })
        .catch(error => response.status(500).send(error))
})

movieRouter.get('/:id', async (request, response) => {
    let movie = await Movie.findById(request.params.id)
        .then(result => {
            if (!result) return response.status(404)
            response.send(result)
        })
        .catch(error => response.status(404).send(error))
})

movieRouter.delete('/:id', async (request, response) => {
    //if (!request.params.id) return response.status(500)
    logger.info(request.params.id)
    let result = await Movie.findByIdAndRemove(request.params.id)
        .then(result => response.send(result))
        .catch(error => response.status(500).send(error))
})


movieRouter.get('/genre/movie/:id', async (request, response) => {

    let result = await Movie.find({
        'genre._id':request.params.id
    })
        .then(result => {if (!result) return response.status(404)
        response.send(result)})
        .catch(error => response.send(500).send(error))
})

module.exports = movieRouter

