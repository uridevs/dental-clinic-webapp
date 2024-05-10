const { sequelize, Cita, Intervencion} = require("../database.js");
const { Op } = require('sequelize');

exports.crearCita = async (req, res) => {
    const { id_paciente, inicio, fin, id_empleado, id_tipo_tratamiento } = req.body;

    // Verificar solapamientos
    const solapamiento = await Cita.findOne({
        where: {
            id_empleado,
            inicio: { [Op.lt]: fin },
            fin: { [Op.gt]: inicio }
        }
    });

    if (solapamiento) {
        return res.status(400).send("El doctor ya tiene una cita programada en este horario.");
    }

    try {
        // Transacción para asegurar la creación de intervención y cita
        const resultado = await sequelize.transaction(async (t) => {
            const nuevaIntervencion = await Intervencion.create({
                id_historial: id_paciente, 
                fecha_hora: inicio,
                id_tipo_tratamiento,
                id_empleado,
                notas: "Pendiente de realizar"
            }, { transaction: t });

            console.log(nuevaIntervencion);
            const nuevaCita = await Cita.create({
                id_paciente,
                inicio,
                fin,
                id_empleado,
                id_intervencion: nuevaIntervencion.id_intervencion, // Usando el ID de la intervención recién creada
                estado: "Pendiente",
                id_tipo_tratamiento
            }, { transaction: t });

            return { nuevaCita, nuevaIntervencion };
        });

        res.status(201).json(resultado);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.listarCitas = async (req, res) => {
    try {
        const citas = await Cita.findAll();
        res.json(citas);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.listarPorPaciente = async (req, res) => {
    try {
        const citas = await Cita.findAll({
            where: { id_paciente: req.params.id }
        });
        res.json(citas);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.listarPorDoctor = async (req, res) => {
    try {
        const citas = await Cita.findAll({
            where: { id_empleado: req.params.id }
        });
        res.json(citas);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.modificarCita = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Cita.update(req.body, { where: { id } });
        if (updated) {
            const updatedCita = await Cita.findByPk(id);
            res.status(200).json(updatedCita);
        } else {
            throw new Error('Cita no encontrada');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.eliminarCita = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Cita.destroy({ where: { id } });
        if (deleted) {
            res.status(200).send("Cita eliminada correctamente.");
        } else {
            throw new Error('Cita no encontrada');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

