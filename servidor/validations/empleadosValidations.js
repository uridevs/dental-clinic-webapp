const { body, validationResult } = require('express-validator');

exports.validacionesEmpleado = [
    body('dni').isLength({ min: 9, max: 9 }).withMessage('DNI debe tener 9 caracteres, 8 números y 1 letra'),
    body('email').isEmail().withMessage('Correo electrónico inválido'),
    body('nombre').not().isEmpty().withMessage('El nombre no puede estar vacío'),
    body('apellidos').not().isEmpty().withMessage('Los apellidos no pueden estar vacíos'),
    body('password').optional().isStrongPassword().withMessage('La contraseña no es suficientemente segura, debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un símbolo'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

