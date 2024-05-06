// /models/Especialidad.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Especialidad = sequelize.define('Especialidad', {
    id_especialidad: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_especialidad: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'Especialidad'
});

module.exports = Especialidad;
