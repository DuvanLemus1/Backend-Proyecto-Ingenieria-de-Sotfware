const {Router}=require('express');
const { confirmarCuenta ,autenticar, olvidePassword, comprobarPassword, nuevoPassword} = require('../controllers/login');
const route=new Router();
const {checkAuth}=require('../middleware/authMiddleware')


route.get('/confirmar/:token',confirmarCuenta);
route.post('/login',autenticar);
route.post('/olvidePassword',olvidePassword);

route.get('/comprobarPassword/:token',comprobarPassword);
route.post('/almacenarPassword/:token',nuevoPassword);
module.exports = route;