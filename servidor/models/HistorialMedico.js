// /models/HistorialMedico.js

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('HistorialMedico', {
        id_historial: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        observaciones: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        timestamps: false,
        tableName: 'HistorialMedico'
    });
};
