const { sequelize, Usuario} = require("../database.js");

exports.listarUsuarios = async (req, res) => {
    try {
      const empleados = await Usuario.findAll({
        attributes: { exclude: ["password"] },
      });
      res.json(empleados);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

