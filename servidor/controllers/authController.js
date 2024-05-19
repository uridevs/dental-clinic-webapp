const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuario } = require("../database.js");

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
        res.json({ message: 'Autenticación exitosa', token, user: { id: usuario.id, role: usuario.role } });
    } catch (error) {
        console.error(`Error durante el proceso de autenticación para ${email}: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};



// TODO testear este código para generar seguridad adicional
// exports.login = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const usuario = await Usuario.findOne({ where: { email } });
//         if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
//             const delay = calculateDelay(email);
//             setTimeout(() => {
//                 res.status(401).json({ message: 'Autenticación fallida' });
//             }, delay);
//             return;
//         }

//         // Resto del código para autenticación exitosa
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// function calculateDelay(email) {
//     // Incrementa y obtiene el número de intentos fallidos para el email
//     const attempts = incrementFailedAttempts(email);
//     return Math.min(5000, (Math.pow(2, attempts) - 1) * 1000);
// }