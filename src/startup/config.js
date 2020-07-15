const config = require('config')
const logger = require('node-color-log');
const winston = require('winston')

module.exports = function (){
    if (!config.get('jwtPrivateKey')){
        logger.info('FATAL ERROR : jwtPrivateKey is not defined')
        winston.error('FATAL ERROR : jwtPrivateKey is not defined')
        process.exit(1)
    }
}