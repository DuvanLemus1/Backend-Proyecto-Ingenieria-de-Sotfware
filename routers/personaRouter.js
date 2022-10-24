const {Router}=require('express');
const route=new Router();
const {checkAuth}=require('../middleware/authMiddleware')
const {getPersonas, postPersona}=require('../controllers/personaController')

route.get('/personas',getPersonas);

route.post('/guardarPersona',postPersona);

module.exports =route;
