const express = require('express');
const routes = express.Router();
const control = require('../controllers/control')

// routes.get('/data', control.getData);
routes.post('/registro', control.register);
routes.get('/get', control.getData )
routes.get('/productos', control.getProducts)

module.exports = routes