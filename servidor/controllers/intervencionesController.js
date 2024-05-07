// /controllers/intervencionesController.js
const Intervencion = require('../models/Intervencion');
const { Op } = require('sequelize');

exports.listarIntervencionesPorDia = async (req, res) => {
    try {
        const { fecha } = req.params;
        const intervenciones = await Intervencion.findAll({
            where: {
                fecha_hora: {
                    [Op.like]: `${fecha}%`  // Formato YYYY-MM-DD
                }
            }
        });
        res.json(intervenciones);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.listarIntervencionesPorPaciente = async (req, res) => {
    try {
        const { idPaciente } = req.params;
        const intervenciones = await Intervencion.findAll({
            where: {
                id_historial: idPaciente
            }
        });
        res.json(intervenciones);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.crearIntervencion = async (req, res) => {
    try {
        const { id_historial, fecha_hora, id_tipo_tratamiento, id_empleado, notas } = req.body;
        const nuevaIntervencion = await Intervencion.create({
            id_historial,
            fecha_hora,
            id_tipo_tratamiento,
            id_empleado,
            notas
        });
        res.status(201).json(nuevaIntervencion);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.modificarIntervencion = async (req, res) => {
    try {
        const { id } = req.params;
        const { fecha_hora, id_tipo_tratamiento, id_empleado, notas } = req.body;
        const [ updated ] = await Intervencion.update({
            fecha_hora,
            id_tipo_tratamiento,
            id_empleado,
            notas
        }, {
            where: { id_intervencion: id }
        });

        if (updated) {
            const updatedIntervencion = await Intervencion.findByPk(id);
            res.json(updatedIntervencion);
        } else {
            res.status(404).send('Intervención no encontrada');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.borrarIntervencion = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Intervencion.destroy({
            where: { id_intervencion: id }
        });
        if (deleted) {
            res.status(204).send("Intervención eliminada.");
        } else {
            throw new Error('Intervención no encontrada');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};
