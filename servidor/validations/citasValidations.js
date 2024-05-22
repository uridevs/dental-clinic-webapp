const { body, validationResult } = require('express-validator');
const { Cita, Empleado, Paciente, Intervencion } = require('../database');

exports.validarCrearCita = [
    body('id_paciente').isInt().withMessage('El ID del paciente debe ser un número entero válido'),
    body('id_empleado').isInt().withMessage('El ID del empleado debe ser un número entero válido'),
    body('id_tipo_tratamiento').isInt().withMessage('El ID del tratamiento debe ser un número entero válido'),
    body('inicio').isISO8601().withMessage('La fecha de inicio debe ser una fecha válida').custom((value) => {
        const now = new Date();
        const twoHoursLater = new Date(now.getTime() + 2 * 60 * 60 * 1000);
        if (new Date(value) < twoHoursLater) {
            throw new Error('La fecha de inicio debe ser al menos dos horas después de la hora actual');
        }
        return true;
    }),
    body('fin').isISO8601().withMessage('La fecha de fin debe ser una fecha válida').custom((value, { req }) => {
        if (new Date(value) <= new Date(req.body.inicio)) {
            throw new Error('La fecha de fin debe ser posterior a la fecha de inicio');
        }
        return true;
    }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
