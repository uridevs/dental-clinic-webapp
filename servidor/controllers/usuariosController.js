const bcrypt = require('bcryptjs');
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

exports.cambiarPassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const { id } = req.user;

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).send('Usuario no encontrado');
    }

    const isMatch = await bcrypt.compare(currentPassword, usuario.password);
    if (!isMatch) {
      return res.status(400).send('Contraseña actual incorrecta');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await Usuario.update({ password: hashedPassword }, { where: { id } });

    res.send('Contraseña cambiada con éxito');
  } catch (error) {
    res.status(500).send('Error al cambiar la contraseña');
  }
};

