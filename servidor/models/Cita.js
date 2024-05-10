module.exports = (sequelize, DataTypes) => {
  const Cita = sequelize.define(
    "Cita",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_paciente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Paciente",  
          key: 'id_paciente' 
        }
      },
      inicio: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      fin: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      id_empleado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Empleado",  
          key: 'id_empleado'  
        }
      },
      id_intervencion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Intervencion",  
          key: 'id_intervencion'  
        }
      },
      estado: {
        type: DataTypes.ENUM(
          "Pendiente",
          "Cancelada",
          "En Espera",
          "En Proceso",
          "Finalizada"
        ),
        allowNull: false,
      },
      id_tipo_tratamiento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Tratamiento",  
          key: 'id_tipo_tratamiento'  
        },
      },
    },
    {
      tableName: "Cita",
      timestamps: false,  
    }
  );

  return Cita;
};
