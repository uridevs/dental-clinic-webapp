const { sequelize, Empleado, Usuario } = require("../database.js");
const bcrypt = require("bcryptjs");

exports.listarEmpleados = async (req, res) => {
  try {
    const empleados = await Empleado.findAll({
      include: {
        model: Usuario,
        as: 'usuario',
        attributes: ['role']
      }
    });
    res.json(empleados);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.listarDoctores = async (req, res) => {
  try {
    const empleados = await Empleado.findAll({
      include: {
        model: Usuario,
        as: 'usuario',
        attributes: ['role']
      }
    });

    const doctores = empleados.filter(empleado => empleado.usuario.role === '2');
    res.json(doctores);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.listarEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const empleado = await Empleado.findByPk(id, {
      include: {
        model: Usuario,
        as: 'usuario',
        attributes: ['role']
      }
    });
    if (empleado) {
      res.json(empleado);
    } else {
      res.status(404).send("Empleado no encontrado");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.crearEmpleado = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const {
      nombre,
      apellidos,
      dni,
      telefono,
      email,
      id_categoria_profesional,
      fecha_antiguedad,
      password,
    } = req.body;

    // Crea el usuario asociado
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const nuevoUsuario = await Usuario.create({
      email,
      password: passwordHash,
      role: id_categoria_profesional
    }, { transaction: t });

    // Crea el empleado vinculado al usuario creado
    const nuevoEmpleado = await Empleado.create({
      nombre,
      apellidos,
      dni,
      telefono,
      email,
      id_categoria_profesional,
      fecha_antiguedad,
      usuarioId: nuevoUsuario.id
    }, { transaction: t });

    await t.commit();
    res.status(201).json({ message: "Empleado creado con éxito", nuevoEmpleado });
  } catch (error) {
    await t.rollback();
    res.status(500).send(error.message);
  }
};

exports.actualizarEmpleado = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { id } = req.params;
    const { nombre, apellidos, dni, telefono, email, id_categoria_profesional, fecha_antiguedad, password } = req.body;

    // Encontrar empleado
    const empleado = await Empleado.findByPk(id);
    if (!empleado) throw new Error("Empleado no encontrado");

    // Actualizar usuario relacionado
    const usuario = await Usuario.findByPk(empleado.usuarioId, { transaction: t });
    if (!usuario) throw new Error("Usuario del empleado no encontrado");

    const passwordHash = password ? await bcrypt.hash(password, 10) : usuario.password;
    await Usuario.update({
      email,
      password: passwordHash,
    }, {
      where: { id: empleado.usuarioId },
      transaction: t
    });

    // Actualizar datos del empleado
    await Empleado.update({
      nombre,
      apellidos,
      dni,
      telefono,
      email,
      id_categoria_profesional,
      fecha_antiguedad
    }, {
      where: { id_empleado: id },
      transaction: t
    });

    await t.commit();
    res.status(200).json({ message: "Empleado actualizado con éxito", empleado });
  } catch (error) {
    await t.rollback();
    res.status(500).send(error.message);
  }
};

exports.eliminarEmpleado = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { id } = req.params;
    const empleado = await Empleado.findByPk(id);
    if (!empleado) throw new Error("Empleado no encontrado");

    // Eliminar usuario asociado
    await Usuario.destroy({
      where: { id: empleado.usuarioId },
      transaction: t
    });

    // Eliminar empleado
    await Empleado.destroy({
      where: { id_empleado: id },
      transaction: t
    });

    await t.commit();
    res.status(204).json({ message: "Empleado eliminado con éxito" });
  } catch (error) {
    await t.rollback();
    res.status(500).send(error.message);
  }
};
