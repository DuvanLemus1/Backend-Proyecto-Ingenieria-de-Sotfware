const { Persona } = require('../models/persona');
const { encriptarContra } = require('../helpers/encriptarContrasenia');
const { emailRegistro } = require('../helpers/emailRegistro');
const { generarId } = require('../helpers/generarid');

const getPersonas = async (req, res) => {

    const personas = await Persona.findAll();

    res.json({ personas })

}

const postPersona = async (req, res) => {

    const { nombreCompleto, correoElectronico, contrasenia } = req.body;

  //  console.log(req.body);
    const existePersona = await Persona.findOne({
        where: {
            correoElectronico:req.body.correoElectronico
        }}
    );

    console.log("Existe Persona:",existePersona);
    // TODO: verificar que el correo no este almacenado
    if (existePersona) {
        const error = new Error("Usuario ya registrado")
        return res.status(404).json({ msg: error.message })
    }

    try {

        const persona = Persona.build(req.body);
        // TODO: Encriptar contrasenia de la base de datos
        persona.contrasenia = encriptarContra(contrasenia);
        persona.token=generarId();
        await persona.save();
        // TODO: Enviar correo
    
        emailRegistro({
            correoElectronico, nombreCompleto, token:persona.token
        })

        // TODO: retronar el usuario en caso de que todo salga bien
        res.json({ persona });
    } catch (err) {
        console.log(err);
        res.status(404).json({ msg: "No se almaceno" })
    }







}
module.exports = { getPersonas, postPersona }