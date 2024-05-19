module.exports = (sequelize, DataTypes) => {
  const Cita = sequelize.define('Cita', {
      id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
      },
      id_paciente: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      inicio: {
          type: DataTypes.DATE,
          allowNull: false
      },
      fin: {
          type: DataTypes.DATE,
          allowNull: false
      },
      id_empleado: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      id_intervencion: {
          type: DataTypes.INTEGER,
          allowNull: true
      },
      estado: {
          type: DataTypes.ENUM('Pendiente', 'Cancelada', 'En Espera', 'En Proceso', 'Realizada'),
          defaultValue: 'Pendiente',
          allowNull: false
      },
      id_tipo_tratamiento: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      notas: {
          type: DataTypes.TEXT,
          allowNull: true
        }
      }, {
          timestamps: false // Deshabilitar createdAt y updatedAt
      });

  Cita.associate = function(models) {
      Cita.belongsTo(models.Empleado, { foreignKey: 'id_empleado', as: 'doctor' });
      Cita.belongsTo(models.Paciente, { foreignKey: 'id_paciente', as: 'paciente' });
      Cita.belongsTo(models.Intervencion, { foreignKey: 'id_intervencion', as: 'intervencion' });
      Cita.belongsTo(models.Tratamiento, { foreignKey: 'id_tipo_tratamiento', as: 'tratamiento' });
  };

  return Cita;
};
