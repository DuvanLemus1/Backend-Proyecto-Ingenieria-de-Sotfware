const jwt = require('jsonwebtoken');
const { Persona } = require('../models/persona');
const checkAuth = async (req, res, next) => {

    const token = req.header('token');
   console.log(token);
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }

   try {
        const  {uid,tipo} = jwt.verify(token, process.env.JWT_SECRET);
        const {dataValues} = await Persona.findByPk(uid);
        

        if (!dataValues) {
            return res.status(401).json({
                msg: 'Token no valido- usuario no existe'
            })
        }
     
        req.usuario=dataValues;

        next();
    

    } catch (error) {
        return res.status(401).json({
            msg: 'Token no valido'
        })
    } 

}

module.exports = { checkAuth };