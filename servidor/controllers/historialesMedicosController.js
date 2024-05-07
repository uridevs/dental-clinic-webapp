// /controllers/historialesMedicosController.js
const HistorialMedico = require('../models/HistorialMedico');

exports.obtenerHistorialMedico = async (req, res) => {
    try {
        const { id } = req.params;
        const historialMedico = await HistorialMedico.findByPk(id);
        if (historialMedico) {
            res.json(historialMedico);
        } else {
            res.status(404).send('Historial Médico no encontrado');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.actualizarObservaciones = async (req, res) => {
    try {
        const { id } = req.params;
        const { observaciones } = req.body;
        const updated = await HistorialMedico.update({ observaciones }, {
            where: { id_historial: id }
        });
        if (updated[0] > 0) {
            res.send('Observaciones actualizadas correctamente.');
        } else {
            res.status(404).send('Historial Médico no encontrado.');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};
