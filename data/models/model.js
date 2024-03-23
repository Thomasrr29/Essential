const mongoose = require('mongoose')

const modelUsers = {
    id: Number,
    name: String,
    email: String,
    password: String
}

const sneakersModel = {

    id: Number,
    referencia: Number,
    name: String,
}


const modeloUsers = mongoose.model('usuarios', modelUsers)
const modelSneakers = mongoose.model('productos', sneakersModel)
module.exports = {modeloUsers, modelSneakers}