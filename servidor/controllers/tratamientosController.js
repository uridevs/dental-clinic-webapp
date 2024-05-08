// /controllers/tratamientosController.js
const {sequelize, Tratamiento}  = require("../database.js");

exports.listarTratamientos = async (req, res) => {
    try {
        const tratamientos = await Tratamiento.findAll();
        res.json(tratamientos);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.crearTratamiento = async (req, res) => {
    try {
        const { nombre_tratamiento, id_especialidad, descripcion_tratamiento, precio_tratamiento } = req.body;
        const nuevoTratamiento = await Tratamiento.create({
            nombre_tratamiento,
            id_especialidad,
            descripcion_tratamiento,
            precio_tratamiento
        });
        res.status(201).json({message: "tratamiento creado con éxito",nuevoTratamiento});
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.actualizarTratamiento = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_tratamiento, id_especialidad, descripcion_tratamiento, precio_tratamiento } = req.body;
        const [ updated ] = await Tratamiento.update({
            nombre_tratamiento,
            id_especialidad,
            descripcion_tratamiento,
            precio_tratamiento
        }, {
            where: { id_tipo_tratamiento: id }
        });

        if (updated) {
            const updatedTratamiento = await Tratamiento.findOne({ where: { id_tipo_tratamiento: id } });
            res.status(200).json({message: "tratamiento creado con éxito",updatedTratamiento})
        } else {
            throw new Error('Tratamiento no encontrado');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.eliminarTratamiento = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Tratamiento.destroy({
            where: { id_tipo_tratamiento: id }
        });
        if (deleted) {
            res.status(204).send("Tratamiento eliminado.");
        } else {
            throw new Error('Tratamiento no encontrado');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};
