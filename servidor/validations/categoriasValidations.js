const {param, body, validationResult } = require('express-validator');

exports.validarCrearCategoria = [
    body('nombre_categoria')
        .trim()
        .notEmpty().withMessage('El nombre de la categoría no puede estar vacío')
        .isLength({ min: 3, max: 50 }).withMessage('El nombre de la categoría debe tener entre 3 y 50 caracteres')
        .matches(/^[a-zA-Z0-9_ \u00C0-\u00FF]*$/).withMessage('El nombre de la categoría solo puede contener letras, números y espacios'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

exports.validarEliminarCategoria = [
    param('id')
        .isInt().withMessage('El ID de la categoría debe ser un número entero válido'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
