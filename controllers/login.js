const {Persona}=require('../models/persona');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jws');
const{generarId}=require('../helpers/generarid');
const { emailOlvidePassword } = require('../helpers/emailOlvidePassword');
const {encriptarContra}=require('../helpers/encriptarContrasenia');

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

const olvidePassword = async (req, res) => {
    const { correoElectronico } = req.body;

    const existePersona = await Persona.findOne({
        where: {
            correoElectronico:req.body.correoElectronico
        }}
    );

    if (!existePersona) {
        return res.status(400).json({
            msg: 'Usuario no existe'
        })
    }

    try {
        existePersona.token = generarId();
        await existePersona.update();
        emailOlvidePassword({
            correoElectronico,
            nombreCompleto: existePersona.nombreCompleto,
            token: existePersona.token
        })
        res.json({ msg: 'Hemos enviado un email con las instrucciones' })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Algo a fallado comuniquese con su proveedor'
        });
    }
}

const comprobarPassword = async (req, res) => {
    const { token } = req.params;

    const tokenValido =await Persona.findOne({where: {token: token}})

    if (tokenValido) {
        res.json({ msg: 'Token valido y el usuario existe' })
    } else {
        return res.status(400).json({
            msg: 'El token no es valido'
        })
    }
}

const nuevoPassword = async (req, res) => {

    const { token } = req.params;
    const { contrasenia } = req.body;

    const persona = await Persona.findOne({where: {token: token}})

    if (!persona) {
        return res.status(400).json({
            msg: 'Hubo un error'
        });
    }

    try {
        persona.token = null;
        persona.contrasenia = encriptarContra(contrasenia);
        console.log(persona);
        await persona.save();
        res.json({
            msg: 'Password modificado correctamente'
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: 'Hubo un error  al cambiar el password'
        });
    }

}
module.exports ={confirmarCuenta,autenticar,olvidePassword,comprobarPassword,nuevoPassword}