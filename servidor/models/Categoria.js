// /models/Categoria.js
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Categoria', {
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
}