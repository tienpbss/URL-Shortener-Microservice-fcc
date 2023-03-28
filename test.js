require('dotenv').config();

const shortid = require('shortid')

const port = process.env.PORT || 3000;


let value = shortid.generate()

console.log(value)
console.log(process.env['MONGOOSE_URI'], process.env.PORT)

console.log(typeof(port))