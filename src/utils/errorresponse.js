
function errorResponse(response,statusCode , errorMessage){
    return response.status(statusCode).send(JSON.stringify({error:`${errorMessage}`}))
}

module.exports = errorResponse