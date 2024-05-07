// /models/Especialidad.js

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Especialidad', {
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
}