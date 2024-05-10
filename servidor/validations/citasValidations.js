const { body, param, validationResult } = require('express-validator');
const { Cita, Empleado, Paciente, Intervencion } = require('../database');


exports.validarCrearCita = [
    body('id_paciente').isInt().withMessage('El ID del paciente debe ser un número entero válido'),
    body('id_empleado').isInt().withMessage('El ID del empleado debe ser un número entero válido'),
    body('id_intervencion').isInt().withMessage('El ID de la intervención debe ser un número entero válido'),
    body('inicio').isISO8601().withMessage('La fecha de inicio debe ser una fecha válida').custom((value, { req }) => {
        if (new Date(value) < new Date()) {
            throw new Error('La fecha de inicio debe ser futura');
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