const mongoose = require('mongoose')
const Joi = require('joi')

let Rental = mongoose.model('Rental', mongoose.Schema({
    customer:{
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength:5,
                maxlength:50
            },
            isGold:{
                type:Boolean,
                required: true,
                default:false
            },
            phone:{
                type:Number,
                required:true,
                minlength: 5,
                maxlength: 15
            }
        }),
        ref: 'customer',
        required:true
    },

    movie: {
        type: new mongoose.Schema({
            title:{
                type:String,
                required:true,
                trim:true,
                minlength:5,
                maxlength:255
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 255
            }
        }),
        ref:'movie',
        required:true
    },
    dateOut:{
        type:Date,
        required:true,
        default: Date.now
    },
    dateRental:{
        type:Date,
    },
    rentalFee:{
        type:Number,
        min: 0
    }
}))

function validateRental(rental){
    let schema = {
        customerID: Joi.string().required(),
        movieID: Joi.string().required()
    }
    return Joi.validate(rental, schema)
}

module.exports.Rental = Rental
module.exports.validateRental = validateRental