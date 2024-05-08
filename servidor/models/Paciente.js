// /models/Paciente.js
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Paciente', {
        id_paciente: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        apellidos: {
            type: DataTypes.STRING,
            allowNull: false
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
        },
        usuarioId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false,
        tableName: 'Paciente'
    });
};


