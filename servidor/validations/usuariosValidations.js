const { body, validationResult } = require('express-validator');

exports.validarActualizarPass = [
    body('newPassword').isStrongPassword().withMessage('La contraseña no es suficientemente segura, debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un símbolo'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];