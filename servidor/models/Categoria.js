// /models/Categoria.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Categoria = sequelize.define('Categoria', {
    id_categoria_profesional: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_categoria: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'Categoria'
});

module.exports = Categoria;
