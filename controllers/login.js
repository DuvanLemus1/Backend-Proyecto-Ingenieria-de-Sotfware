const {Persona}=require('../models/persona');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jws');
const confirmarCuenta = async (req, res) => {

    const { token } = req.params

    const personaConfirmar = await Persona.findOne({where: {token: token}})

    if (!personaConfirmar) {
        const error = new Error('Token no valido');
        return res.status(404).json({ msg: error.message })
    }

    if (personaConfirmar.token===null) {
        const error = new Error('Token ya confirmado');
        return res.status(404).json({ msg: error.message })
    }

    try {
        personaConfirmar.token = null;
        await personaConfirmar.save();
        res.json({ msg: "Usuario confirmado correctamente" })
    } catch (error) {
        console.log(error);
    }
}
const autenticar = async (req, res) => {
    const { contrasenia } = req.body

    const existePersona = await Persona.findOne({
        where: {
            correoElectronico:req.body.correoElectronico
        }}
    );

    if (!existePersona) {

        const error = new Error('Usuario no autorizado');
        return res.status(403).json({ msg: error.message })

    }

    // Comprobar si el usuario esta confirmado 
    if (existePersona.token!==null) {

        const error = new Error('Tu Cuenta no a sido confirmada');
        return res.status(403).json({ msg: error.message })
    }

    //comprobar password
    const comprobarPassword = await bcryptjs.compare(contrasenia, existePersona.contrasenia);
    if (comprobarPassword) {
        const token = await generarJWT(existePersona.id);
        res.json({
            idPesona: existePersona.id,
            nombreCompleto:existePersona.nombreCompleto,
            correoElectronico: existePersona.correoElectronico,
            token,
          });
    } else {
        const error = new Error("El Password es incorrecto");
        return res.status(403).json({ msg: error.message });
    }

}

module.exports ={confirmarCuenta,autenticar}