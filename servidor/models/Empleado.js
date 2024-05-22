module.exports = (sequelize, DataTypes) => {
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
      nombre: {
        type: DataTypes.STRING,
        allowNull: false
      },
      apellidos: {
        type: DataTypes.STRING,
        allowNull: false
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
      },
      usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      timestamps: false,
      tableName: 'Empleado'
    });
  
    Empleado.associate = function(models) {
      Empleado.belongsTo(models.Usuario, { foreignKey: 'usuarioId', as: 'usuario' });
    };
  
    return Empleado;
  };
  
  