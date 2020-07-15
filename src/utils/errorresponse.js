
const winston = require('winston')
function errorResponse(response,statusCode , errorMessage){
    winston.error( errorMessage)
    return response.status(statusCode).send(JSON.stringify({error:`${errorMessage}`}))
}

module.exports = errorResponse