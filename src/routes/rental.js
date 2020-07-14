const express = require('express')
const routerRental = express.Router()
const {Movie} = require('./../module/movie-module')
const {Customer} = require('./../module/customer-model')
const {Rental, validateRental} = require('./../module/rental-model')
const logger = require('node-color-log');

routerRental.get('/', async (request, response) => {
    let result = await Rental.find()
        .sort({dateOut: -1})
        .then(result => {
            if (!result) return response.status(404)
            response.send(result)
        })
        .catch(error => response.status(500).send(error))
})


routerRental.post('/', async (request, response) => {

    logger.info(request.body.movieID)

    let body = {
        movieID: "movie",
        customerID: "customer"
    }

    let {error} = validateRental(body)
    logger.info(error)
    //if (error) return response.status(400).send(error.details[0].message)

    let customer = await Customer.findById(request.body.customerID)
    if (!customer) return response.status(400).send('Invalid customer.')

    let movie = await Movie.findById(request.body.movieID)
    if (!movie) return response.status(400).send('Invalid movie.')

    if (movie.numberInStock === 0) return response.status(400).send('Movie not in stock.');

    let rental = new Rental({
        customer: {
            _id: customer._id,
            isGold: customer.isGold,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    })

    let result = await rental.save()
    movie.numberInStock--
    let movieResult = movie.save()
    logger.info(movieResult)
    response.send(result)
    logger.info(result)
})

routerRental.get('/:id', async (request, response) => {
    let result = await Rental.findById(request.params.id)
        .then(result => {
            if (!result) return response.status(404).send('The rental with the given ID was not ')
            response.send(result)
        })
        .catch(error => response.status(404).send(error))
})

module.exports = routerRental
