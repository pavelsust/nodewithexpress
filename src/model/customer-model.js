const mongoose = require('mongoose')
const Joi = require('joi');
let CustomerSchema = new mongoose.Schema({
    name:{type:String, required: true, minlength:3},
    isGold:{type:Boolean, required: true},
    phone:({type:Number , required:true})
})
const Customer = mongoose.model('customer',CustomerSchema)


function validateCustomerUpdate(course) {
    const schema = {
        name: Joi.string().min(3).required(),
        isGold: Joi.boolean().required(),
        phone:Joi.number().required()
    }
    return Joi.validate(course, schema)
}

module.exports.validateCustomerUpdate = validateCustomerUpdate
module.exports.Customer = Customer
module.exports.CustomerSchema = CustomerSchema