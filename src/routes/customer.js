const express = require('express')
const customerRouter = express.Router()
const mongoose = require('mongoose')
const {CustomerSchema} = require('./../module/customer-model')

const Customer = mongoose.model('customer',CustomerSchema)

customerRouter.get('/' , async (request , response)=>{
    let customerList =await Customer.find()
        .sort({name:1})
        .then(result => {
            if (!result) return response.status(404).send('Not found')
            return response.send(result)
        }).catch(error => response.status(500).send(''+error))
})

customerRouter.post('/', async (request , response)=>{
    let createCustomer = new Customer({
        name: request.body.name,
        isGold: request.body.isGold,
        phone: request.body.phone
    })

    let createResult = await createCustomer.save()
        .then(result => {if(!result) return response.status(404).send()
            response.send(result)})
        .catch(error => response.status(500).send(error))
})

module.exports = customerRouter