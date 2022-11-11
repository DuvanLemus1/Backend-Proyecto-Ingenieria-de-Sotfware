const { db } = require('../config/db');
const { DataTypes } = require('sequelize');


const ImagenesProducto = db.define('imagenesProducto', {
    idImagenesProducto: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    url: {
        type: DataTypes.STRING
    },
    idProducto: {
        type: DataTypes.INTEGER,
        foreignKey: true
    }
}, {
    tableName: 'imagenesProducto'
});



module.exports = { ImagenesProducto }