// /controllers/intervencionesController.js
const {sequelize, Intervencion}  = require("../database.js");
const { Op } = require('sequelize');

exports.listarIntervencion = async (req, res) => {
    try {
        const { id } = req.params;
        const intervencion = await Intervencion.findByPk(id);
        if(intervencion){
            res.json(intervencion);
        }else{
            res.status(200).json({message: "Error. Nº Intervención no encontrado"})
        }
        
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.listarIntervenciones = async (req, res) => {
    try {
        const { id } = req.params;
        const intervenciones = await Intervencion.findAll();
        res.status(200).json(intervenciones);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

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
        const { id_tipo_tratamiento, id_empleado, notas } = req.body;
        const [ updated ] = await Intervencion.update({
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
            res.status(200).json({message: "Intervención eliminada."});
        } else {
            throw new Error('Intervención no encontrada');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};
