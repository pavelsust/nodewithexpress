const winston = require('winston')
require('winston-mongodb')
module.exports = function (){
    winston.add(winston.transports.MongoDB, {db: 'mongodb://localhost/vidly'})
}