require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

// Configuración de Sequelize
const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASS, {
        host: process.env.DB_HOST,
        dialect: 'mysql'
    }
);

// Importa modelos
const Paciente = require('./models/Paciente')(sequelize, DataTypes);
const Empleado = require('./models/Empleado')(sequelize, DataTypes);
const HistorialMedico = require('./models/HistorialMedico')(sequelize, DataTypes);
const Tratamiento = require('./models/Tratamiento')(sequelize, DataTypes);
const Intervencion = require('./models/Intervencion')(sequelize, DataTypes);
const Categoria = require('./models/Categoria')(sequelize, DataTypes);

// Aquí puedes definir relaciones entre modelos si las hay

module.exports = {
    sequelize,
    Paciente,
    Empleado,
    HistorialMedico,
    Tratamiento,
    Intervencion,
    Categoria
};
