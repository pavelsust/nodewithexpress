const express = require('express')
const router = express.Router()
const logger = require('node-color-log');
const {Genre,validateCourse} = require('../model/genres-model')
const authMiddleWare = require('./../middleware/middleware-auth')
const adminMiddleWare = require('../middleware/middleware-admin')
const errorResponse = require('./../utils/errorresponse')


router.get('/', async (request, response, ) => {

    let genres = await Genre.find()
        .sort('name')
        .then(result =>{if (!result) return response.status(500)
        response.send(result)})
        .catch(error=> errorResponse(response , 500 , ''+error))


})

router.post('/', authMiddleWare, async (request, response) => {

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

router.delete('/:id', [authMiddleWare, adminMiddleWare], async (request, response, next) => {

    let genreDeleteResult = await Genre.findByIdAndRemove(request.params.id)
        .then(result =>{if (!result) return errorResponse(response, 404, 'Id not found')
        response.send(result)})
    .catch(error =>{errorResponse(response, 500, error)})

})

router.get('/:id', async (request, response, next) => {

    let genreFindResult = Genre.findById(request.params.id)
        .then(result =>{if (!result) return next('Id not found')
        response.send(result)})
        .catch(error => errorResponse(response, 500, error))

})

module.exports = router