const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');


const storage = multer.diskStorage({
  destination: path.join(__dirname, "../uploads"),
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });
exports.upload = upload.array("archivo");

exports.subirImagen = async (req, res) => {

  try {
    const { files } = req
    const urlImagenes = files.map(file => file.filename);
    res.json({ msg: 'Archivos Guardados', urlImagenes });
  } catch (err) {
    res.status(400).json({ "msg": "Error al subir la imagen" });
  }

}
