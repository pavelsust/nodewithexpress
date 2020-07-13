const express = require('express')
const router = express.Router()
const Joi = require('joi')
const mongoose = require('mongoose')
const logger = require('node-color-log');
const {Genre,validateCourse} = require('./../module/genres-model')


router.get('/', async (request, response) => {
    let genres = await Genre.find()
        .sort('name')
    response.send(genres)

})

router.post('/', async (request, response) => {

    let {error} = validateCourse(request.body)
    if (error) return response.status(400).send(error.details[0].message)

    try {
        let genre = new Genre({
            name: request.body.name
        })
        logger.info('validation error' + genre)
        let result = await genre.save()
        response.send(result)
    } catch (e) {
        logger.info(e.errors.name)
        response.status(500).send(e.message)
    }

})

router.put('/:id', async (request, response) => {

    let {error} = validateCourse(request.body)
    if (error) return response.status(400).send(error.details[0].message)

    let genreQueryResult = await Genre.findByIdAndUpdate(request.params.id, {
        name: request.body.name
    }, {new: true}).then((result)=>{
        logger.info(result)
        if (!result) return response.status(404).send('The genre not found')
        response.send(result)
    }).catch(error => response.status(500).send())

    logger.info('result '+genreQueryResult)
})

router.delete('/:id', async (request, response) => {

    try {
        let genreDeleteResult = await Genre.findByIdAndRemove(request.params.id)
        if (!genreDeleteResult) return response.status(404).send('The given course is not found')
        response.send(genreDeleteResult)
    } catch (e) {
        console.log(e)
        response.status(500).send(e)
    }

})


router.get('/:id', async (request, response) => {
    try {
        let genreFindResult = await Genre.findById(request.params.id)
        if (!genreFindResult) return response.status(404).send('Id not found')
        response.send(genreFindResult)
    } catch (e) {
        logger.info(e)
        response.status(500)
    }
})

module.exports = router