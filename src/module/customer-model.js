const mongoose = require('mongoose')

let CustomerSchema = new mongoose.Schema({
    name:{type:String, required: true, minlength:3},
    isGold:{type:Boolean, required: true},
    phone:({type:Number , required:true})
})

module.exports.CustomerSchema = CustomerSchema