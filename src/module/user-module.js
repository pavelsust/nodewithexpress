const mongoose = require('mongoose')
const Joi = require('joi')

const User = mongoose.model('user' , mongoose.Schema({
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
    }

}))

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
