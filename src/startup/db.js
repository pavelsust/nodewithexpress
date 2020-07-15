const winston = require('winston')
const mongoose = require('mongoose')

module.exports = function (){
    mongoose.connect('mongodb://localhost/vidly')
        .then(()=> winston.info('Connected to MongoDB...'))
        .catch(error => winston.error('Database is not connected '+error))

}