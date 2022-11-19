const { db } = require('../config/db');
const { DataTypes } = require('sequelize');

const { ImagenesProducto } = require('../models/imagenesProducto');


const Producto = db.define('producto', {
    idProducto: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
    },
    cantidad: {
        type: DataTypes.INTEGER
    },
    precioVenta: {
        type: DataTypes.INTEGER
    },
    fecha: {
        type: DataTypes.DATE
    },
    disponibilidad: {
        type: DataTypes.BOOLEAN
    },
    estadoProducto: {
        type: DataTypes.STRING
    },
    categoria: {
        type: DataTypes.STRING
    },
    idPersona: {
        type: DataTypes.INTEGER,
        foreignKey: true
    },

}, {
    tableName: 'producto'
});

Producto.hasMany(ImagenesProducto, {
    foreignKey: 'idProducto',
    sourceKey: 'idProducto'
});

ImagenesProducto.belongsTo(Producto, {
    foreignKey: 'idProducto',
    targetId: 'idProducto'
});
module.exports = { Producto };