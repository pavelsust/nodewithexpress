const userRoute = require('express').Router()
const logger = require('node-color-log');
const {User,validateUser} = require('./../module/user-module')
const _ = require('lodash')

userRoute.post('/' , async (request , response)=>{
    let {error} = validateUser(request.body)
    if (error) return response.status(400).send(responseError(error.details[0].message))

    let checkUser = await User.findOne({email: request.body.email})
    if (checkUser) return response.status(400).send(responseError('User Already registered'))

    let userResult = new User(_.pick(request.body, ['name', 'email', 'password']))

    let user =await userResult.save()
        .then(result => {if (!result) return  response.status(500)
        response.send( _.pick(result, ['name' , 'email']))
        })
        .catch(error => response.status(400).send(JSON.stringify({error:"Email id already used"})))
})

function responseError(result){
    return JSON.stringify({error: result})
}

module.exports = userRoute