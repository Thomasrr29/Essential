const express = require('express');
const routes = express.Router();
const control = require('../controllers/control')

// routes.get('/data', control.getData);

routes.get('/get', control.getData )
routes.post('/registro', control.register);
routes.post('/inicios', control.login);
routes.get('/productos', control.getProducts)

module.exports = routes