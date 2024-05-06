const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Paciente = sequelize.define('Paciente', {
    id_paciente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dni: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    telefono: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    fecha_alta: {
        type: DataTypes.DATE
    }
}, {
    timestamps: false,
    tableName: 'Paciente'
});

module.exports = Paciente;
