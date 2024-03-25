const mongoose = require('mongoose')

const schemaRegistros = {
    id: Number,
    name: String,
    email: String,
    password: String
};

const schemaInicios = {

    id: Number,
    email: String,
    password: String,
};

const sneakersModel = {

    id: Number,
    referencia: Number,
    name: String,
};


const modeloRegistros = mongoose.model('registros', schemaRegistros);
const modeloInicio = mongoose.model('inicios', schemaInicios);
const modelSneakers = mongoose.model('productos', sneakersModel);


module.exports = {modeloRegistros, modeloInicio, modelSneakers}