const { body, validationResult } = require('express-validator');

exports.validarLogin = [
    body('email').isEmail().withMessage('Correo electrónico inválido'),
    body('password').isLength({ min: 5 }).withMessage('La contraseña debe tener al menos 5 caracteres'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
