const config = require('config')
const jwt = require('jsonwebtoken')
const logger = require('node-color-log');

function auth (request , response , next){
    let token = request.header('x-auth-token')
    if (!token) return response.status(401).send('Access denied. No token provided')
    try {
        let decoded = jwt.verify(token, config.get('jwtPrivateKey'))
        request.user = decoded
        next()

    }catch (error){
        logger.info(error)
        response.status(400).send('Invalid token')
    }
}

module.exports = auth