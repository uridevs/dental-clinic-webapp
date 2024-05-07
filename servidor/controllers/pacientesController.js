// /controllers/pacientesController.js
const { sequelize, Paciente, HistorialMedico } = require("../database.js");
const bcrypt = require("bcryptjs");

exports.listarPacientes = async (req, res) => {
  try {
    const pacientes = await Paciente.findAll({
      attributes: { exclude: ["password"] },
    });
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
    const { nombre, apellidos, dni, telefono, email, fecha_alta, password } =
      req.body;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const nuevoPaciente = await Paciente.create(
      {
        nombre,
        apellidos,
        dni,
        telefono,
        email,
        fecha_alta,
        password: passwordHash,
      },
      { transaction: t }
    );

    await HistorialMedico.create(
      {
        id_historial: nuevoPaciente.id_paciente,
        observaciones: "",
      },
      { transaction: t }
    );

    await t.commit();
    res.status(201).json({ message: "Paciente creado con éxito" });
  } catch (error) {
    await t.rollback();
    res.status(500).send(error.message);
  }
};

exports.actualizarPaciente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellidos, dni, telefono, email, fecha_alta, password } =
      req.body;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const [updated] = await Paciente.update(
      {
        nombre,
        apellidos,
        dni,
        telefono,
        email,
        fecha_alta,
        password: passwordHash,
      },
      {
        where: { id_paciente: id },
      }
    );

    if (updated) {
      const updatedPaciente = await Paciente.findOne({
        where: { id_paciente: id },
        attributes: { exclude: ["password"] },
      });
      res
        .status(200)
        .json({ message: "Paciente modificado con éxito", updatedPaciente });
    } else {
      throw new Error("Paciente no encontrado");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.eliminarPaciente = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Paciente.destroy({
      where: { id_paciente: id },
    });
    if (deleted) {
      res.status(204).json({ message: "Paciente eliminado con éxito" });
    } else {
      throw new Error("Paciente no encontrado");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
