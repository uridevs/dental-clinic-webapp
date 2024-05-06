// /models/Empleado.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Empleado = sequelize.define('Empleado', {
    id_empleado: {
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
    id_categoria_profesional: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Categoria',
            key: 'id_categoria_profesional'
        }
    },
    fecha_antiguedad: {
        type: DataTypes.DATE
    }
}, {
    timestamps: false,
    tableName: 'Empleado'
});

module.exports = Empleado;
