// /controllers/pacientesController.js
const { sequelize, Paciente, Usuario, HistorialMedico } = require("../database.js");
const bcrypt = require("bcryptjs");

exports.listarPacientes = async (req, res) => {
  try {
    const pacientes = await Paciente.findAll();
    res.json(pacientes);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.listarPaciente = async (req, res) => {
  try {
    const { id } = req.params;
    const paciente = await Paciente.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    if (paciente) {
      res.json(paciente);
    } else {
      res.status(404).send("Paciente no encontrado");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.crearPaciente = async (req, res) => {
  const t = await sequelize.transaction();
  try {
      const { nombre, apellidos, dni, telefono, email, fecha_alta, password } = req.body;

      // Crear usuario
      const usuario = await Usuario.create({
          email,
          password: await bcrypt.hash(password, 10),
          role: 'paciente'
      }, { transaction: t });

      // Crear paciente
      const paciente = await Paciente.create({
          nombre,
          apellidos,
          dni,
          telefono,
          email,
          fecha_alta,
          usuarioId: usuario.id
      }, { transaction: t });

      // Crear historial médico asociado al nuevo paciente
      await HistorialMedico.create(
        {
          id_historial: paciente.id_paciente,
          observaciones: "",
        },
        { transaction: t }
      );

      await t.commit();
      res.status(201).json({ message: "Paciente creado con éxito", paciente});
  } catch (error) {
      await t.rollback();
      res.status(500).send(error.message);
  }
};


exports.actualizarPaciente = async (req, res) => {
  const t = await sequelize.transaction();
  try {
      const { id } = req.params;
      const { nombre, apellidos, dni, telefono, email, password } = req.body;

      // Actualizar usuario relacionado
      const paciente = await Paciente.findByPk(id);
      if (!paciente) throw new Error("Paciente no encontrado");

      const usuario = await Usuario.findByPk(paciente.usuarioId, { transaction: t });
      if (!usuario) throw new Error("Usuario asociado al paciente no encontrado");

      const passwordHash = await bcrypt.hash(password, 10);
      await Usuario.update({
          email: email,
          password: passwordHash,
      }, {
          where: { id: paciente.usuarioId },
          transaction: t
      });

      // Actualizar paciente
      await Paciente.update({
          nombre,
          apellidos,
          dni,
          telefono,
          email, 
      }, {
          where: { id_paciente: id },
          transaction: t
      });

      await t.commit();
      res.status(200).json({ message: "Paciente actualizado con éxito" });
  } catch (error) {
      await t.rollback();
      res.status(500).send(error.message);
  }
};

exports.eliminarPaciente = async (req, res) => {
  const t = await sequelize.transaction();
  try {
      const { id } = req.params;

      // Encontrar el paciente
      const paciente = await Paciente.findByPk(id);
      if (!paciente) throw new Error("Paciente no encontrado");

      // Eliminar el historial médico asociado
      await HistorialMedico.destroy({
          where: { id_historial: paciente.id_paciente },
          transaction: t
      });

      // Eliminar el usuario asociado
      await Usuario.destroy({
          where: { id: paciente.usuarioId },
          transaction: t
      });

      // Finalmente, eliminar el paciente
      await Paciente.destroy({
          where: { id_paciente: id },
          transaction: t
      });

      await t.commit();
      res.status(204).json({ message: "Paciente eliminado con éxito" });
  } catch (error) {
      await t.rollback();
      res.status(500).send(error.message);
  }
};
