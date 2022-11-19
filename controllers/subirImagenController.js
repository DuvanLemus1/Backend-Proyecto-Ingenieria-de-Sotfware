const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');
const { Persona } = require('../models/persona');
const { Producto } = require('../models/producto');
const { ImagenesProducto } = require('../models/imagenesProducto');

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../uploads"),
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });
exports.upload = upload.array("archivo");

exports.subirImagen = async (req, res) => {
  const { files } = req

  const { data } = req.body;
  const data2 = JSON.parse(data);

  try {

    //TODO: comprobar que existe el usuario
    const persona = await Persona.findByPk(data2.idPersona);

    if (!persona) {
      return res.status(400).json({ msg: 'No existe el usuario' });
    }
    const urlImagenes = files.map(file => file.filename);

    const producto = Producto.build(data2);
    const { _previousDataValues, dataValues, ...producto3 } = await producto.save();
    producto.idProducto = producto3.null;
    //TODO: Guardar las imagenes
    urlImagenes.map(async (url) => {
      let objectImagen = {
        url,
        idProducto: producto.idProducto
      }
      const imagen = ImagenesProducto.build(objectImagen);
      await imagen.save();
    });

    res.json({ msg: 'Se a guardado correctamente', producto });
  } catch (err) {
    res.status(400).json({ "msg": "Error al subir la imagen" + err });
  }

}
