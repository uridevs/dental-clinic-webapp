const Especialidad = require('../models/Especialidad');

exports.listarEspecialidades = async (req, res) => {
    try {
        const especialidades = await Especialidad.findAll();
        res.json(especialidades);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.crearEspecialidad = async (req, res) => {
    try {
        const nuevaEspecialidad = await Especialidad.create(req.body);
        res.json(nuevaEspecialidad);
    } catch (error) {
        res.status(500).send(error.message);
    }
};