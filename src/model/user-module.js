const mongoose = require('mongoose')
const Joi = require('joi')
const config = require('config')
const jwt = require('jsonwebtoken')
const logger = require('node-color-log');

let userSchema = mongoose.Schema({
    name: {
        type:String,
        required: true,
        minlength:3,
        maxlength:50
    },

    email: {
        type:String,
        required: true,
        minlength:3,
        maxlength:255,
        unique:true
    },

    password: {
        type:String,
        required: true,
        minlength:3,
        maxlength:1024
    },
    isAdmin: Boolean
})

userSchema.methods.generateAuthToken = function (){
    logger.info(this._id)
    return jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'))
}

const User = mongoose.model('user' , userSchema)

function validateUser(user){
    let schema={
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
    }
    return Joi.validate(user, schema)
}

module.exports.validateUser = validateUser
module.exports.User = User
