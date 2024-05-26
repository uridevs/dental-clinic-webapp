// citasController.js
const { sequelize, Cita, Paciente, Empleado, Tratamiento, Intervencion } = require("../database.js");
const { Op } = require('sequelize');
const Especialidad = require("../models/Especialidad.js");

exports.crearCita = async (req, res) => {
    const { id_paciente, inicio, fin, id_empleado, id_tipo_tratamiento, notas } = req.body;

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
        const resultado = await sequelize.transaction(async (t) => {
            const nuevaIntervencion = await Intervencion.create({
                id_historial: id_paciente,
                fecha_hora: inicio,
                id_tipo_tratamiento,
                id_empleado,
                notas: "Pendiente de realizar"
            }, { transaction: t });

            const nuevaCita = await Cita.create({
                id_paciente,
                inicio,
                fin,
                id_empleado,
                id_intervencion: nuevaIntervencion.id_intervencion,
                estado: "Pendiente",
                id_tipo_tratamiento,
                notas: notas || "" // Permitimos enviar el campo notas vacío
            }, { transaction: t });

            return { nuevaCita, nuevaIntervencion };
        });

        res.status(201).json(resultado);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.listarCita = async (req, res) => {
    try {
      const { id } = req.params;
      const cita = await Cita.findOne({
        where: { id },
        include: [
          { model: Paciente, attributes: ['nombre', 'apellidos', 'dni', 'email', 'telefono'], as: 'paciente' },
          { model: Empleado, attributes: ['nombre', 'apellidos'], as: 'doctor' },
          { model: Tratamiento, attributes: ['nombre_tratamiento', 'id_especialidad'], as: 'tratamiento' }
        ]
      });
  
      if (cita) {
        res.json(cita);
      } else {
        res.status(404).send("Cita no encontrada");
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

exports.listarCitas = async (req, res) => {
    try {
        let citas;
        if (req.user.role === 'paciente') {
            citas = await Cita.findAll({
                where: { id_paciente: req.user.idEspecifico },
                include: [
                    { model: Paciente, attributes: ['nombre', 'apellidos'], as: 'paciente' },
                    { model: Empleado, attributes: ['nombre', 'apellidos'], as: 'doctor' },
                    { model: Tratamiento, attributes: ['nombre_tratamiento'], as: 'tratamiento' }
                ]
            });
        } else {
            citas = await Cita.findAll({
                include: [
                    { model: Paciente, attributes: ['nombre', 'apellidos'], as: 'paciente' },
                    { model: Empleado, attributes: ['nombre', 'apellidos'], as: 'doctor' },
                    { model: Tratamiento, attributes: ['nombre_tratamiento'], as: 'tratamiento' }
                ]
            });
        }
        res.json(citas);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.listarCitasProximas = async (req, res) => {
    try {
        const { role, idEspecifico } = req.user; // Asumiendo que esto viene del middleware de autenticación
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 1);

        let whereClause = {
            inicio: {
                [Op.between]: [startDate, endDate],
            },
        };

        if (role === '2') { // Si es un doctor
            whereClause.id_empleado = idEspecifico;
        }

        const citas = await Cita.findAll({
            where: whereClause,
            include: [
                { model: Paciente, attributes: ['nombre', 'apellidos'], as: 'paciente' },
                { model: Empleado, attributes: ['nombre', 'apellidos'], as: 'doctor' },
                { model: Tratamiento, attributes: ['nombre_tratamiento'], as: 'tratamiento' },
            ],
        });

        res.json(citas);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.listarPorPaciente = async (req, res) => {
    try {
        const citas = await Cita.findAll({
            where: { id_paciente: req.params.id },
            include: [
                { model: Paciente, attributes: ['nombre', 'apellidos'], as: 'paciente' },
                { model: Empleado, attributes: ['nombre', 'apellidos'], as: 'doctor' },
                { model: Tratamiento, attributes: ['nombre_tratamiento'], as: 'tratamiento' }
            ]
        });
        res.json(citas);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.listarPorDoctor = async (req, res) => {
    try {
        const citas = await Cita.findAll({
            where: { id_empleado: req.params.id },
            include: [
                { model: Paciente, attributes: ['nombre', 'apellidos'], as: 'paciente' },
                { model: Empleado, attributes: ['nombre', 'apellidos'], as: 'doctor' },
                { model: Tratamiento, attributes: ['nombre_tratamiento'], as: 'tratamiento' }
            ]
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
            throw new Error(`Cita no encontrada: {error}`);
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
