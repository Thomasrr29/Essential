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

    id:Number,
    imagen:String,
    nombre:String,
    detalles: String,
    precio: String,
    genero: String,
    marca:String,
    tallas: Array,
    descripcion: String
};

const favoritosModel = {
    id: Number,
    nombre: String,
    imagen: String,
}

const carritoModel = {
    id: Number,
    nombre: String,
    imagen: String,
}


const modeloRegistros = mongoose.model('registros', schemaRegistros);
const modeloInicio = mongoose.model('inicios', schemaInicios);
const modelSneakers = mongoose.model('productos', sneakersModel);
const modelFavoritos = mongoose.model('favoritos', favoritosModel)
const modelCarrito = mongoose.model('carrito', carritoModel)


module.exports = {modeloRegistros, modeloInicio, modelSneakers, modelFavoritos, modelCarrito}