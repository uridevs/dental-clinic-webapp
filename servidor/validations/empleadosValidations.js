const { body, validationResult } = require('express-validator');

exports.validacionesEmpleado = [
    body('dni').isLength({ min: 9, max: 9 }).withMessage('DNI debe tener 9 caracteres'),
    body('email').isEmail().withMessage('Correo electrónico inválido'),
    body('nombre').not().isEmpty().withMessage('El nombre no puede estar vacío'),
    body('apellidos').not().isEmpty().withMessage('Los apellidos no pueden estar vacíos'),
    body('password').optional().isStrongPassword().withMessage('La contraseña no es suficientemente segura'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];