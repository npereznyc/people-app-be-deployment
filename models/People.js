const mongoose = require('mongoose')

const PoepleSchema = new mongoose.Schema({
    name: {type: String, required: true},
    image: String,
    title: String
}, {timestamps: true})

const People = mongoose.model("People", PoepleSchema)

module.exports = People