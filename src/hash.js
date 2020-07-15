const bcrypt = require('bcrypt')


run()
async function run(){
    const salt = await bcrypt.genSalt(10)
   let result = await bcrypt.hash('1234', salt)
    console.log(salt)
    console.log(result)
}