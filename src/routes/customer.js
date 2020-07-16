const customerRouter = require('express').Router()
const {Customer, validateCustomerUpdate} = require('../model/customer-model')
const {Rental} = require('../model/rental-model')
const logger = require('node-color-log');
const Fawn = require('fawn')

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
        name: request.body.name,
        isGold: request.body.isGold,
        phone: request.body.phone
    }, {new: true}).catch(error => response.status(404).send(error))
    response.send(customerResult)
    logger.info(customerResult)

    let rentalsUpdate = await Rental.updateMany({'customer._id': request.params.id}, {
        $set: {
            'customer.name': customerResult.name,
            'customer.isGold': customerResult.isGold,
            'customer.phone': customerResult.phone
        }
    })

    logger.info(rentalsUpdate)
})

customerRouter.delete('/:id', async (request, response) => {

    /*
    let result = await Customer.findByIdAndRemove(request.params.id)
        .then(result => {if(!result) return response.status(404).send('Customer not found')
        response.send(result)})
        .catch(error => response.status(500).send(error))

     */

    let customer = await Customer.findById(request.params.id)
    if (!customer) return response.status(404).send('Customer id not fond')
    /**
     *  If a customer id removed
     *  those id's rental will automatically removed
     *
     */
    try {
        new Fawn.Task()
            .remove('customers', {_id: customer._id})
            .remove('rentals', {'customer._id': customer._id})
            .run()

        response.send(customer)

    } catch (error) {
        response.status(500).send(error)
    }

})

module.exports = customerRouter