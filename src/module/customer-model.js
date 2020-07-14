const mongoose = require('mongoose')

let CustomerSchema = new mongoose.Schema({
    name:{type:String, required: true, minlength:3},
    isGold:{type:Boolean, required: true},
    phone:({type:Number , required:true})
})
const Customer = mongoose.model('customer',CustomerSchema)


module.exports.Customer = Customer
module.exports.CustomerSchema = CustomerSchema