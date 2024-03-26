
const { error } = require('console')
const {modeloInicio, modeloRegistros, modelSneakers, modelFavoritos, modelCarrito} = require('../models/model')
 
const control = {
 
    getData: async (req, res) => {

        try{

            const users = await modeloInicio.find()
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

            
        } catch(error){
            console.error('Error encontrado intentando postear carrito', error)
        }
    },

    login: async (req, res) => {

        const {email, password} = req.body
        try {

            const userFine = await modeloRegistros.findOne({email: email})

            if(!userFine){
                res.status(401).json('Usuario no encontrado')
                res.redirect('../PaginaDeInicio/index.html')
            }
            if(userFine.password != password){
                res.status(401).json('Contraseña invalida')
                res.redirect('../PaginaDeInicio/index.html')
                
            }

            if(userFine && userFine.password === password){
                const logins = await modeloInicio.find()
                const login = {
                    id: logins.length + 1,
                    email: email,
                    password: password
                }
    
                const loginModel = new modeloInicio(login)
                console.log(modeloInicio)
                const savedLogin = await loginModel.save()
                console.log(savedLogin)
                res.status(200).json("Inicio de sesion exitoso")
                res.redirect('../UserPage/index.html')
            }
            


        } catch(error){

            console.error(`Tuvimos un error iniciando sesión ${error}`)
        
        }
    },

    register: async (req, res) => {
        
        console.log(req.body)
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
            console.log(users)
            res.json(savedUsers)

        } catch(error){
            console.error(`Error de registro ${error}`)
        }
    },

}

module.exports = control