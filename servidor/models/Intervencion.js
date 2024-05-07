// /models/Intervencion.js

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Intervencion', {
        id_intervencion: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_historial: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'HistorialMedico',
                key: 'id_historial'
            }
        },
        fecha_hora: {
            type: DataTypes.DATE,
            allowNull: false
        },
        id_tipo_tratamiento: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Tratamiento',
                key: 'id_tipo_tratamiento'
            }
        },
        id_empleado: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Empleado',
                key: 'id_empleado'
            }
        },
        notas: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        timestamps: false,
        tableName: 'Intervencion'
    });
}