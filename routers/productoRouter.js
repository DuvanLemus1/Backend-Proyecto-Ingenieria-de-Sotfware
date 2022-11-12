const {Router}=require('express');
const {checkAuth}=require('../middleware/authMiddleware');
const imagenController = require('../controllers/subirImagenController');
const { guardarProducto, mostrarImagen, listadoProductos } = require('../controllers/productoController');

const route=new Router();




//Area privada checkAuth es para autenticar el token
route.post('/',checkAuth,imagenController.upload,imagenController.subirImagen);

route.post('/guardarProducto',guardarProducto);
route.get('/mostrarImagen',mostrarImagen);

route.get('/listadoProductos',listadoProductos);
module.exports =route;