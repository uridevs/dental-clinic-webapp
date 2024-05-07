// /controllers/empleadosController.js
const { sequelize, Empleado, HistorialMedico } = require("../database.js");
const bcrypt = require("bcryptjs");

exports.listarEmpleados = async (req, res) => {
  try {
    const empleados = await Empleado.findAll({
      attributes: { exclude: ["password"] },
    });
    res.json(empleados);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.listarEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const empleado = await Empleado.findByPk(id, {
      attributes: { exclude: ["password"] },
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
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const nuevoEmpleado = await Empleado.create({
      nombre,
      apellidos,
      dni,
      telefono,
      email,
      id_categoria_profesional,
      fecha_antiguedad,
      password: passwordHash,
    });

    await t.commit();
    res
      .status(201)
      .json({ message: "Empleado creado con éxito", nuevoEmpleado });
  } catch (error) {
    await t.rollback();
    res.status(500).send(error.message);
  }
};

exports.actualizarEmpleado = async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, apellidos, dni, telefono, email, id_categoria_profesional, fecha_antiguedad, password } = req.body;
  
      // Hashea la contraseña si está presente
      let updateData = {
        nombre,
        apellidos,
        dni,
        telefono,
        email,
        id_categoria_profesional,
        fecha_antiguedad
      };
  
      if (password) {
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(password, salt);
      }
  
      const [updated] = await Empleado.update(updateData, {
        where: { id_empleado: id }
      });
  
      if (updated) {
        const updatedEmpleado = await Empleado.findOne({
          where: { id_empleado: id },
          attributes: { exclude: ['password'] } // Excluir el campo password de la respuesta
        });
        res.status(200).json({ message: "Empleado modificado con éxito", empleado: updatedEmpleado });
      } else {
        throw new Error("Empleado no encontrado");
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

exports.eliminarEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Empleado.destroy({
      where: { id_empleado: id },
    });
    if (deleted) {
      res.status(204).json({ message: "Empleado eliminado con éxito" });
    } else {
      throw new Error("Empleado no encontrado");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
