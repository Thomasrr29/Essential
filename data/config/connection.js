
const mongoose = require('mongoose')

const connection = async () => {

    try{

        await mongoose.connect('mongodb+srv://thomasrr29:thomasrr29@cluster0.tjsiu0l.mongodb.net/Essential')

    } catch(error){

        console.error( `Error de conexión con MONGODB ${error}`)
    }
}

module.exports = connection