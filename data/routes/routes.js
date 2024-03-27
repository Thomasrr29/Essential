const express = require('express');
const routes = express.Router();
const control = require('../controllers/control')

// routes.get('/data', control.getData);

routes.get('/get', control.getData )
routes.post('/registro', control.register);
routes.post('/inicios', control.login);
routes.get('/carrito', control.getCarrito);
routes.post('/carrito', control.postCarrito);
routes.delete('/deleteCarrito/:id', control.deleteCarrito);
routes.get('/productos', control.getProducts);
routes.post('/favoritos', control.postFavoritos)
routes.get('/favoritos', control.getFavorites);


module.exports = routes