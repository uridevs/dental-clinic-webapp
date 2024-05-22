// /models/Tratamiento.js
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Tratamiento', {
        id_tipo_tratamiento: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_tratamiento: {
            type: DataTypes.STRING,
            allowNull: false
        },
        id_especialidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Especialidad',
                key: 'id_especialidad'
            }
        },
        descripcion_tratamiento: {
            type: DataTypes.STRING,
            allowNull: false
        },
        precio_tratamiento: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    }, {
        timestamps: false,
        tableName: 'Tratamiento'
    });
}
