const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuario, Paciente, Empleado } = require("../database.js");

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            console.error(`Intento de inicio de sesión fallido para email no registrado: ${email}`);
            return res.status(401).json({ message: 'Autenticación fallida' });
        }

        const valid = await bcrypt.compare(password, usuario.password);
        if (!valid) {
            console.error(`Inicio de sesión fallido para ${email}: contraseña incorrecta`);
            return res.status(401).json({ message: 'Autenticación fallida' });
        }

        const token = jwt.sign({ id: usuario.id, email: usuario.email, role: usuario.role }, 'your_secret_key', { expiresIn: '1h' });

        let idEspecifico;
        if (usuario.role === 'paciente') {
            const paciente = await Paciente.findOne({ where: { email } });
            if (paciente) {
                idEspecifico = paciente.id_paciente;
            }
        } else {
            const empleado = await Empleado.findOne({ where: { email } });
            if (empleado) {
                idEspecifico = empleado.id_empleado;
            }
        }

        res.json({ message: 'Autenticación exitosa', token, user: { id: usuario.id, role: usuario.role, idEspecifico } });
    } catch (error) {
        console.error(`Error durante el proceso de autenticación para ${email}: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};
