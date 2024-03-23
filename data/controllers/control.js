
const {modeloUsers, modelSneakers} = require('../models/model')
 
const control = {
 
    getData: async (req, res) => {

        try{
            const users = await modeloUsers.find()
            res.json(users)
        } catch(error){
            console.error(`Error obteniendo los usuarios ${error}`)
        }

    },

    register: async (req, res) => {
        
        console.log(req.body)
        const {name, email, password} = req.body
        
        try {

            const user = await modeloUsers.find()
            console.log(user)
            const userData = {
                id: user.length + 1,
                name: name,
                email: email,
                password: password,
            }

            const users = new modeloUsers(userData)
            const savedUsers = await users.save()
            console.log(users)
            res.json(savedUsers)

        } catch(error){
            console.error(`Error de registro ${error}`)
        }
    },

    getProducts: async (req, res) => {

        try{
            
            const products = await modelSneakers.find()
            res.json(products)

        } catch(error){

            console.error(error)

        }
   
    }
}

module.exports = control