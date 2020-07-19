const express = require('express')
const routerRental = express.Router()
const {Movie} = require('../model/movie-module')
const {Customer} = require('../model/customer-model')
const {Rental, validateRental} = require('../model/rental-model')
const Fawn = require('fawn')
const logger = require('node-color-log')


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

    /*
    {
        "movieID": "5f0cbc342d38ac0d47fe2a32",
        "customerID": "5f0c1e0b1688c60b95360562"
    }
     */

    let {error} = validateRental(request.body)
    if (error) return response.status(400).send(error.details[0].message)

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

    try {
        new Fawn.Task()
            .save('rentals', rental)
            .update('movies', {_id: movie._id}, {
                $inc: {numberInStock: -1}
            }).run()

        response.send(rental)
    } catch (error) {
        response.status(500).send(error)
    }

})

routerRental.get('/details/:id', async (request, response) => {

    let result = await Rental.findById(request.params.id)
        .then(result => {
            if (!result) return response.status(404).send('The rental with the given ID was not ')
            response.send(result)
        })
        .catch(error => response.status(404).send(error))
})


routerRental.get('/pavel', async (request, response) => {

    let result = await Rental.find({
        dateOut: {
            $lt:''+new Date('2020-07-22').toISOString(),
            $gt:''+new Date('2020-07-21').toISOString()
        }
    })
        .sort({dateOut: -1})
        .then(result => {
            if (!result) return response.status(404)
            response.send(result)
        })
        .catch(error => response.status(500).send(error))
})

module.exports = routerRental
