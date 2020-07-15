const authRoute = require('express').Router()

const Joi = require('joi')
const bcrypt = require('bcrypt')
const logger = require('node-color-log');
const {User,validateUser} = require('./../module/user-module')
const _ = require('lodash')


authRoute.post('/' , async (request , response)=>{

    /*
    {
        "email": "pavel1@gmail.com",
        "password": "1234567"
    }
     */

    let {error} = validateAuth(request.body)
    if (error) return response.status(400).send(responseError(error.details[0].message))

    let checkUser = await User.findOne({email: request.body.email})
    if (!checkUser) return response.status(400).send(responseError('Invalid email or password'))

    let validPassword = await bcrypt.compare(request.body.password, checkUser.password)
    if (!validPassword) return response.status(400).send(responseError('Invalid email or password'))
    let token = checkUser.generateAuthToken()
    response.send(responseToken(token))

})

function responseError(result){
    return JSON.stringify({error: result})
}

function responseToken(token){
    return JSON.stringify({token: token})
}


function validateAuth(auth){
    let schema={
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
    }
    return Joi.validate(auth, schema)
}

module.exports = authRoute