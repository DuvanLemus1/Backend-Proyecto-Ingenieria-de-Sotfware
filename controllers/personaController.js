const {Persona}=require('../models/persona');

const getPersonas = async (req, res) => {

    const personas = await Persona.findAll();

    res.json({ personas })

}


module.exports ={getPersonas}