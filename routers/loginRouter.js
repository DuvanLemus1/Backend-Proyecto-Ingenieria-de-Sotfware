const {Router}=require('express');
const { confirmarCuenta ,autenticar} = require('../controllers/login');
const route=new Router();
const {checkAuth}=require('../middleware/authMiddleware')


route.get('/confirmar/:token',confirmarCuenta);
route.post('/login',autenticar);

module.exports = route;