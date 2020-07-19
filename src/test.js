const express = require('express')
const router = express.Router()
const dateFormat = require('dateformat');
const logger = require('node-color-log')

let array = [1, 3, 5]


result()

async function result() {

    let result = await findArrayItem(1)
        .then(result => console.log(result))
        .catch(error => console.log(error))

    //console.log(result)
}


function findArrayItem(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let result = array.find(args => args === id)
            //reject(new Error('error'))
            resolve(result)
        }, 2000)
    })
}

nowDate()
function nowDate(){
    logger.info(dateFormat(Date.now(), "dd/mm/yyyy"))
}