const { Router } = require('express');
const { checkAuth } = require('../middleware/authMiddleware');
const imagenController = require('../controllers/subirImagenController');
const { guardarProducto, mostrarImagen, listadoProductos, getProducto } = require('../controllers/productoController');

const route = new Router();


//Area privada checkAuth es para autenticar el token
route.post('/', imagenController.upload, imagenController.subirImagen);

route.get('/mostrarImagen', mostrarImagen);

route.get('/listadoProductos', listadoProductos);

route.get('/:id',getProducto);
module.exports = route;