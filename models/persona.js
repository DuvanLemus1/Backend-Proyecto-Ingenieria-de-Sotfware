const { db } = require('../config/db');
const { DataTypes } = require('sequelize');

const {Producto}=require('../models/producto');

const Persona = db.define('persona', {
    idPersona: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nombreCompleto: {
        type: DataTypes.STRING
    },
    correoElectronico: {
        type: DataTypes.STRING
    },
    telefono: {
        type: DataTypes.STRING
    },
    calificacion: {
        type: DataTypes.INTEGER
    },
    departamento: {
        type: DataTypes.STRING
    },
    municipio: {
        type: DataTypes.STRING
    },
    rol:{
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN
    },
    contrasenia: {
        type: DataTypes.STRING
    },
    token: {
        type: DataTypes.STRING
    },
}, {
    tableName: 'persona'
});
Persona.hasMany(Producto, {
    foreignKey: 'idPersona',
    sourceKey: 'idPersona'
});

Producto.belongsTo(Persona, {
    foreignKey: 'idPersona',
    sourceKey: 'idPersona'
});

module.exports = { Persona };