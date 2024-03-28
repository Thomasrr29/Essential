const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schemaTokenRefresh = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'registros' },
    token: String,
    expires: Date,
    createdAt: {type: Date, default: Date.now},
    revoked: {type: Boolean, default: false}
})

const schemaRegistros = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: true},
})

schemaRegistros.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next()
});

const schemaInicios = {

    id_registro: Number,
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
    precio: String,
};

const carritoModel = {
    id: Number,
    nombre: String,
    imagen: String,
    precio: String
};

const modeloRegistros = mongoose.model('registros', schemaRegistros);
const modeloInicio = mongoose.model('inicios', schemaInicios);
const modelSneakers = mongoose.model('productos', sneakersModel);
const modelFavoritos = mongoose.model('favoritos', favoritosModel);
const modelCarrito = mongoose.model('carritos', carritoModel);
const modelRefreshToken = mongoose.model('refreshToken', schemaTokenRefresh);


module.exports = {modeloRegistros, modeloInicio, modelSneakers, modelFavoritos, modelCarrito, modelRefreshToken}