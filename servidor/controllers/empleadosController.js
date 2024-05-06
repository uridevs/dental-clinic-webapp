// /controllers/empleadosController.js
const Empleado = require('../models/Empleado');

exports.listarEmpleados = async (req, res) => {
    try {
        const empleados = await Empleado.findAll();
        res.json(empleados);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.crearEmpleado = async (req, res) => {
    try {
        const nuevoEmpleado = await Empleado.create(req.body);
        res.json(nuevoEmpleado);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.actualizarEmpleado = async (req, res) => {
    try {
        const { id } = req.params;
        const [ updated ] = await Empleado.update(req.body, {
            where: { id_empleado: id }
        });
        if (updated) {
            const updatedEmpleado = await Empleado.findOne({ where: { id_empleado: id } });
            res.status(200).json(updatedEmpleado);
        } else {
            throw new Error('Empleado no encontrado');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.eliminarEmpleado = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Empleado.destroy({
            where: { id_empleado: id }
        });
        if (deleted) {
            res.status(204).send("Empleado eliminado");
        } else {
            throw new Error('Empleado no encontrado');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};
