function error(error , request , response){
    response.send(500).send(error)
}
module.exports = error