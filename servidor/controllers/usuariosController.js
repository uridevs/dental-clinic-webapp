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

exports.resetPassword = async (req, res) => {
  const { id } = req.body;
  const { role } = req.user;

  if (role !== "1") {
      return res.status(403).json({ message: "Acceso denegado: no tiene los permisos adecuados." });
  }

  try {
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
          return res.status(404).json({ message: "Usuario no encontrado" });
      }

      const defaultPassword = usuario.role === "paciente" ? "Paciente1234." : "Empleado1234.";
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(defaultPassword, salt);

      await Usuario.update({ password: hashedPassword }, { where: { id } });

      res.json({ message: "Contraseña restablecida con éxito" });
  } catch (error) {
      res.status(500).json({ message: "Error al restablecer la contraseña", error });
  }
};

