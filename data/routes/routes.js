const express = require('express');
const routes = express.Router();
const control = require('../controllers/control')

// routes.get('/data', control.getData);


routes.post('/registro', control.register);
routes.post('/inicios', control.login);
routes.post('/carrito', control.postCarrito);
routes.post('/favoritos', control.postFavoritos);
routes.post('/refresh', control.refresh)

routes.get('/carrito', control.getCarrito);
routes.get('/usuarios', control.getInicios);
routes.get('/registros', control.getRegistros);
routes.get('/productos', control.getProducts);
routes.get('/favoritos', control.getFavorites);

routes.delete('/deleteCarrito/:id', control.deleteCarrito);
routes.post('/favoritos', control.postFavorites);
routes.delete('/favoritos/delete/:id', control.deleteFavorite);
routes.get('/carrito', control.getCarrito);

module.exports = routes;