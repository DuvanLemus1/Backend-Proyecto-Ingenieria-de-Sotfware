const { Producto } = require('../models/producto');
const { ImagenesProducto } = require('../models/imagenesProducto');
const { Persona } = require('../models/persona');
const path = require("path");
const fs = require("fs");
const guardarProducto = async (req, res) => {
    const { urlImagenes, ...producto } = req.body;

    //TODO: comprobar que existe el usuario
    const persona = await Persona.findByPk(producto.idPersona);

    if (!persona) {
        return res.status(400).json({ msg: 'No existe el usuario' });
    }


    try {
        //TODO: Guardar el producto 
        const producto2 = Producto.build(producto);
        const { _previousDataValues, dataValues, ...producto3 } = await producto2.save();
        producto2.idProducto = producto3.null;
        //TODO: Guardar las imagenes
        urlImagenes.map(async (url) => {
            let objectImagen = {
                url,
                idProducto: producto2.idProducto
            }
            const imagen = ImagenesProducto.build(objectImagen);
            await imagen.save();
        });
        res.json(producto2)
    } catch (err) {
        console.log(err);
        return res.status(404).json({ msg: 'Error al guardar producto' })
    }


}
const mostrarImagen = async (req, res) => {
    const { id } = req.body
    console.log(req.body);

    const { dataValues } = await ImagenesProducto.findByPk(id);
    console.log(dataValues.url);
    if (!dataValues) {
        return res.status(400).json({ msg: "`El producto  con el ${id} no existe en al bd`" });
    }


    if (dataValues.url) {
        const pathImagen = path.join(__dirname, '../uploads', dataValues.url);
        if (fs.existsSync(pathImagen)) {
            return res.sendFile(pathImagen);
        }
    }
    const pathImagen = path.join(__dirname, '../assets', 'no-image.jpg');

    res.sendFile(pathImagen);
}

const listadoProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll({ include: ImagenesProducto });
    res.json(productos);
  } catch (error) {
    res.status(400).json({ error: error});
  }

 
}

module.exports = { guardarProducto, mostrarImagen, listadoProductos }