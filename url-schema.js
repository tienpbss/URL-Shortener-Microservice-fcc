const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: Math.floor(Math.random()*Math.random()*1000).toString()
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = urlSchema