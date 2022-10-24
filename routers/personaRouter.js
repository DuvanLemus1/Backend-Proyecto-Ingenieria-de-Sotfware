const {Router}=require('express');
const route=new Router();

const {getPersonas}=require('../controllers/personaController')

route.get('/allpersonas',getPersonas);



module.exports =route;
