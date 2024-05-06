const Paciente = require('../models/Paciente');

exports.listarPacientes = async (req, res) => {
    try {
        const pacientes = await Paciente.findAll();
        res.json(pacientes);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.crearPaciente = async (req, res) => {
    try {
        const nuevoPaciente = await Paciente.create(req.body);
        res.json(nuevoPaciente);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
