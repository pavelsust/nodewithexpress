const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const express = require('express')
const mongoose = require('mongoose')
const Fawn = require('fawn')
Fawn.init(mongoose)
const mainRoute = require('./../src/startup/route')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))  //key=value&key=value
app.use(express.static('src/public'))
mainRoute.route(app)
require('./../src/startup/db')()
require('./../src/startup/logging')()
require('./../src/startup/config')()

process.on('uncaughtException', (ex)=>{
    winston.error(ex.message, ex)
    process.exit(1)
})

process.on('unhandledRejection', (error)=>{
    winston.error(error.message, error)
    process.exit(1)
})

process.on('uncaughtExceptionMonitor' , (error)=>{
    winston.error(error.message, error)
    process.exit(1)
})


//PORT
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`listening port ${port}`)
})
