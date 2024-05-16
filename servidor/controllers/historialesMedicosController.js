// /controllers/historialesMedicosController.js
const { HistorialMedico, Paciente, Intervencion } = require("../database.js");

// exports.obtenerHistorialMedico = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const paciente = await Paciente.findByPk(id, {
//             include: [{
//                 model: HistorialMedico,
//                 as: 'historialMedico', // Asegúrate de que esta asociación está correctamente definida en tus modelos
//                 attributes: ['id_historial', 'observaciones']
//             }],
//             attributes: ['nombre', 'apellidos']
//         });
//         if (paciente) {
//             res.json({
//                 nombre: paciente.nombre,
//                 apellidos: paciente.apellidos,
//                 historialMedico: paciente.historialMedico
//             });
//         } else {
//             res.status(404).send('Historial Médico no encontrado');
//         }
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// };
exports.obtenerHistorialMedico = async (req, res) => {
    try {
        const { id } = req.params;
        const paciente = await Paciente.findByPk(id, {
            include: [{
                model: HistorialMedico,
                as: 'historialMedico',
                include: [{
                    model: Intervencion,
                    as: 'intervenciones'  // Asegúrate de que esta asociación está correctamente definida en tus modelos
                }],
                attributes: ['id_historial', 'observaciones']
            }],
            attributes: ['nombre', 'apellidos']
        });
        if (paciente) {
            res.json({
                nombre: paciente.nombre,
                apellidos: paciente.apellidos,
                historialMedico: paciente.historialMedico
            });
        } else {
            res.status(404).send('Historial Médico no encontrado');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.buscarHistorialPorDNI = async (req, res) => {
    try {
        const { dni } = req.params;
        const paciente = await Paciente.findOne({
            where: { dni },
            include: [{
                model: HistorialMedico,
                as: 'historialMedico',
                include: [{
                    model: Intervencion,
                    as: 'intervenciones' 
                }],
                attributes: ['id_historial', 'observaciones']
            }],
            attributes: ['nombre', 'apellidos']
        });
        if (paciente) {
            res.json({
                nombre: paciente.nombre,
                apellidos: paciente.apellidos,
                historialMedico: paciente.historialMedico
            });
        } else {
            res.status(404).send('Paciente no encontrado');
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
