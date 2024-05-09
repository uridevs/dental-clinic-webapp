const { Cita } = require('../models');

exports.crearCita = async (req, res) => {
    const { paciente_id, inicio, fin, empleado_id, intervencion_id, estado, tratamiento_id } = req.body;

    // Verificar solapamientos
    const solapamiento = await Cita.findOne({
        where: {
            empleado_id,
            inicio: { [Op.lt]: fin },
            fin: { [Op.gt]: inicio }
        }
    });

    if (solapamiento) {
        return res.status(400).send("El doctor ya tiene una cita programada en este horario.");
    }

    try {
        const nuevaCita = await Cita.create({
            paciente_id,
            inicio,
            fin,
            empleado_id,
            intervencion_id,
            estado,
            tratamiento_id
        });
        res.status(201).json(nuevaCita);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Implementar otros métodos como actualizar, eliminar, listar citas, etc.

module.exports = {
    crearCita,
    // otros métodos
};
