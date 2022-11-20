const { Producto } = require('../models/producto');
const { ImagenesProducto } = require('../models/imagenesProducto');
const { Persona } = require('../models/persona');
const path = require("path");
const fs = require("fs");

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
  //leer query string 
  const {pagina}=req.query;
  const expresion=/^[0-9]$/
  try {
     
    if (!expresion.test(pagina)) {
      return res.status(404).json({msg:'Revise que este mando un numero en la paginacion'})
    }
    limit=5;
    const offset=((pagina*limit)-limit)

    const [productos,total] = await Promise.all([
      Producto.findAll({ limit,offset,include: ImagenesProducto })
    ,Producto.count()
    ])
    
    const paginas=Math.ceil(total/limit);
    res.json({productos,paginaActual:pagina,totalPaginas:paginas});
  } catch (error) {
    res.status(400).json({ error: error});
  }

 
}


const getProducto= async (req, res) => {
   const  {id}=req.params; 
  try {
    const producto = await Producto.findByPk(id);

    if (!producto) {
     return  res.json({ msg:'No existe el producto'})
    }

    res.json(producto)

   } catch (error) {
    res.status(400).json({error});
   }
}

module.exports = {  mostrarImagen, listadoProductos ,getProducto}