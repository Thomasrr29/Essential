require('dotenv').config();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {modeloInicio, modeloRegistros, modelSneakers, modelFavoritos, modelCarrito, modelRefreshToken} = require('../models/model')


const control = {
 
    getInicios: async (req, res) => {

        try{

            const users = await modeloInicio.find()
            res.json(users)

        } catch(error){
            console.error(`Error obteniendo los usuarios ${error}`)
        }

    },

    getRegistros: async (req, res) => {
        try{

            const users = await modeloRegistros.find()
            res.json(users)

        } catch(error){
            console.error(`Error obteniendo los usuarios ${error}`)
        }
    },

    getFavorites: async (req, res) => {
        try {
            const favoritos = await modelFavoritos.find()
            res.json(favoritos)
        } catch(error){
            console.error('Error obteniendo los productos favoritos', error)
        }
    },

    postFavorites: async (req, res) => {
        const datos = req.body
        try {
            const favoritos = new modelFavoritos(datos)
            const savedFavoritos = await favoritos.save()
            res.json(savedFavoritos)
        } catch(error){
            console.error('Error obteniendo los productos favoritos', error)
        }
    },

    deleteFavorite: async (req, res) => {
        try {   
            const {id} = req.params
            console.log(id);
            const favoritos = await modelFavoritos.findOneAndDelete({id: id})
            res.json(favoritos)
        } catch(error){
            console.error('Error obteniendo los productos favoritos', error)
        }
    },

    getProducts: async (req, res) => {

        try{
            
            const products = await modelSneakers.find()
            res.json(products)

        } catch(error){

            console.error(error)

        }
   
    },

    getCarrito: async (req, res) => {

        try{
            const carrito = await modelCarrito.find()
            res.json(carrito)

        } catch(error){
            console.error('Error obteniendo datos carrito', error)
        }

    },

    postCarrito: async (req, res) => {

        try {

           const {id, nombre, imagen, precio} = req.body

                const dataCarrito = {
                    id: id,
                    nombre: nombre,
                    imagen: imagen,
                    precio: precio,
                }
                
                const data = new modelCarrito(dataCarrito)
                const savedCarrito = data.save()
                res.json(savedCarrito)
           
        } catch(error){
            console.error('Error encontrado intentando postear carrito', error)
        }
    },

    deleteCarrito: async (req, res) => {
        try {
            const {id} = req.params
            console.log(id)
            const carritoDelete = await modelCarrito.findOneAndDelete({id:id})

            if(carritoDelete){
                res.json({message: "Elemento eliminado del carrito"})
                console.log('bien')
            } else {
                res.json({message: "Error eliminando en el carrito"})
                console.log('mal')
            }

            
        } catch(error){
            console.error('ERROR ELIMINANDO DEL CARRITO', error)
        }
    },

    postFavoritos: async (req, res) => {

        try {

           const {id, nombre, imagen, precio} = req.body
           console.log(req.body)

                const dataFavoritos = {
                    id: id,
                    nombre: nombre,
                    imagen: imagen,
                    precio: precio,
                }
                
                const data = new modelFavoritos(dataFavoritos)
                const savedFavoritos = data.save()
                res.json(savedFavoritos)
           
        } catch(error){
            console.error('Error encontrado intentando postear carrito', error)
        }
    },

    login: async (req, res) => {
    
        try{
            const {email, password} = req.body
            const user =  await modeloRegistros.findOne({email:email})


            if (!user || !(await bcrypt.compare(password, user.password))){
                return res.status(401).send('Credenciales incorrectas');
            }
            console.log('Credenciales correctas')

            const inicioUser = new modeloInicio({email: email, password: password})
            await inicioUser.save()

            const accessToken = jwt.sign({userId: user._id},process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
            const refreshToken = jwt.sign({userId: user._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '7d'})

            const newRefreshToken = new modelRefreshToken({
                user:user._id,
                token: refreshToken,
                expires: new Date(Date.now() + 7*24*60*60*1000)
            })

            try{
                
                await newRefreshToken.save()
                .then((respuesta) => {
                    console.log('DOCUMENTO GUARDADO', respuesta)
                }).catch((error) => {
                    console.error('ERROR ENVIANDO LOS DATOS', error)
                })

            } catch(error){
                console.error('ERROR ENVIANDO LOS DATOS', error)

            }
            res.status(200).json({accessToken, refreshToken});
            

        } catch(error){
            console.error('ERROR EN EL INICIO DE SESION', error)
        } 
    },

    register: async (req, res) => {
        
        const {name, email, password} = req.body
        
        try {

            const user = await modeloRegistros.find()
            console.log(user)
            const userData = {
                id: user.length + 1,
                name: name,
                email: email,
                password: password,
            }

            const users = new modeloRegistros(userData)
            const savedUsers = await users.save()
            res.json(savedUsers)

        } catch(error){
            console.error(`Error de registro ${error}`)
        }
    },

    refresh: async (req, res) => {

        const {refreshToken} = req.body

        const storedToken = await modelRefreshToken.findOne({token: refreshToken, revoked: false}).populate('user');

        if(!storedToken || storedToken.expires < new Date()){
            return res.status(401).json({message: "Invalid or expires Token "})
        }

        const newAccessToken = jwt.sign({userId: storedToken.user}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"})

        res.json({accessToken: newAccessToken})



    }
}

module.exports = control