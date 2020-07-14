const express = require('express')
const customerRouter = express.Router()
const {Customer, validateCustomerUpdate} = require('./../module/customer-model')
const {Rental} = require('./../module/rental-model')
const logger = require('node-color-log');


customerRouter.get('/', async (request, response) => {
    let customerList = await Customer.find()
        .sort({name: 1})
        .then(result => {
            if (!result) return response.status(404).send('Not found')
            return response.send(result)
        }).catch(error => response.status(500).send('' + error))
})

customerRouter.post('/', async (request, response) => {
    let createCustomer = new Customer({
        name: request.body.name,
        isGold: request.body.isGold,
        phone: request.body.phone
    })

    let createResult = await createCustomer.save()
        .then(result => {
            if (!result) return response.status(404).send()
            response.send(result)
        })
        .catch(error => response.status(500).send(error))
})

customerRouter.put('/update/:id', async (request, response) => {

    let {error} = validateCustomerUpdate(request.body)
    if (error) return response.status(400).send(error.details[0].message)

    logger.info(request.params.id)

    let customerResult = await Customer.findByIdAndUpdate(request.params.id, {
        name : request.body.name,
        isGold: request.body.isGold,
        phone : request.body.phone
    },{new :true}).catch(error => response.status(404).send(error))
    response.send(customerResult)
    logger.info(customerResult)

    let rentalsUpdate = await Rental.updateMany({'customer._id': request.params.id},{
        $set:{
            'customer.name':customerResult.name,
            'customer.isGold':customerResult.isGold,
            'customer.phone':customerResult.phone
        }
    })

    logger.info(rentalsUpdate)
})

module.exports = customerRouter