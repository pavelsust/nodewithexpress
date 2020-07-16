const userRoute = require('express').Router()
const config = require('config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const logger = require('node-color-log');
const {User, validateUser} = require('../model/user-module')
const _ = require('lodash')
const authMiddleware = require('./../middleware/middleware-auth')

userRoute.get('/me', authMiddleware, async (request, response) => {

    let user = await User.findById(request.user._id)
        .then(result => {
            if (!result) return response.status(401)
            response.send(_.pick(result, ['name', 'email']))
        })
        .catch(error => response.status(500).send(error))
})

userRoute.post('/', async (request, response) => {


    /*
    {
    "name":"Masud Parvez",
    "email": "pavel1@gmail.com",
    "password": "1234567"
}
     */

    let {error} = validateUser(request.body)
    if (error) return response.status(400).send(responseError(error.details[0].message))

    let checkUser = await User.findOne({email: request.body.email})
    if (checkUser) return response.status(400).send(responseError('User Already registered'))

    let userResult = new User(_.pick(request.body, ['name', 'email', 'password']))
    const salt = await bcrypt.genSalt(10)
    userResult.password = await bcrypt.hash(userResult.password, salt)

    let user1 = await userResult.save()
        .then(result => {
            let token = result.generateAuthToken()
            response.header('x-auth-token', token).send(_.pick(result, ['name', 'email']))
        })


})

function responseError(result) {
    return JSON.stringify({error: result})
}

module.exports = userRoute