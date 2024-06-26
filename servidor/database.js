require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");

// Configuración de Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME_REMOTE,
  process.env.DB_USER_REMOTE,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST_REMOTE,
    dialect: "mysql",
  }
);

// Importa modelos
const Usuario = require("./models/Usuario")(sequelize, DataTypes);
const Paciente = require("./models/Paciente")(sequelize, DataTypes);
const Empleado = require("./models/Empleado")(sequelize, DataTypes);
const HistorialMedico = require("./models/HistorialMedico")(
  sequelize,
  DataTypes
);
const Tratamiento = require("./models/Tratamiento")(sequelize, DataTypes);
const Intervencion = require("./models/Intervencion")(sequelize, DataTypes);
const Categoria = require("./models/Categoria")(sequelize, DataTypes);
const Especialidad = require("./models/Especialidad")(sequelize, DataTypes);
const Cita = require('./models/Cita')(sequelize, DataTypes);

//Relaciones entre modelos
// Establece la relación uno a uno entre Paciente e HistorialMedico
Paciente.hasOne(HistorialMedico, {
  foreignKey: "id_historial",
  as: "historialMedico",
});

HistorialMedico.belongsTo(Paciente, {
  foreignKey: "id_historial",
  as: "paciente",
});

HistorialMedico.hasMany(Intervencion, {
  foreignKey: "id_historial",
  as: "intervenciones",
});

Intervencion.belongsTo(HistorialMedico, { foreignKey: "id_historial" });

Paciente.belongsTo(Usuario, { foreignKey: "usuarioId", as: "usuario" });
Usuario.hasOne(Paciente, { foreignKey: "usuarioId", as: "paciente" });

Empleado.belongsTo(Usuario, { foreignKey: "usuarioId", as: "usuario" });
Usuario.hasOne(Empleado, { foreignKey: "usuarioId", as: "empleado" });

Cita.belongsTo(Empleado, { foreignKey: 'id_empleado', as: 'doctor' });
Cita.belongsTo(Paciente, { foreignKey: 'id_paciente', as: 'paciente' });
Cita.belongsTo(Intervencion, { foreignKey: 'id_intervencion', as: 'intervencion' });
Cita.belongsTo(Tratamiento, { foreignKey: 'id_tipo_tratamiento', as: 'tratamiento' });


Especialidad.hasMany(Tratamiento, {
  foreignKey: 'id_especialidad',
  as: 'tratamientos'
});

Tratamiento.belongsTo(Especialidad, {
  foreignKey: 'id_especialidad',
  as: 'especialidad'
});

module.exports = {
  sequelize,
  Cita,
  Usuario,
  Paciente,
  Empleado,
  HistorialMedico,
  Tratamiento,
  Intervencion,
  Categoria,
  Especialidad,
};
