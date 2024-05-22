// authMiddleware.js
const jwt = require('jsonwebtoken');
const { Usuario, Paciente, Empleado } = require('../database');

exports.verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization header not found' });
        }

        const token = authHeader.split(' ')[1]; // Bearer token
        if (!token) {
            return res.status(401).json({ message: 'No token provided, authorization denied' });
        }

        const decoded = jwt.verify(token, 'your_secret_key');
        const usuario = await Usuario.findByPk(decoded.id);

        if (!usuario) {
            return res.status(401).json({ message: 'Invalid token, authorization denied' });
        }

        req.user = {
            id: usuario.id,
            role: usuario.role,
            email: usuario.email
        };

        if (usuario.role === 'paciente') {
            const paciente = await Paciente.findOne({ where: { usuarioId: usuario.id } });
            if (paciente) {
                req.user.idEspecifico = paciente.id_paciente;
            }
        } else {
            const empleado = await Empleado.findOne({ where: { usuarioId: usuario.id } });
            if (empleado) {
                req.user.idEspecifico = empleado.id_empleado;
            }
        }

        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid', error });
    }
};
