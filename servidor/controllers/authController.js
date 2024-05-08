const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuario }= require("../database.js");

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return res.status(401).json({ message: 'Autenticación fallida' });
        }

        const valid = await bcrypt.compare(password, usuario.password);
        if (!valid) {
            return res.status(401).json({ message: 'Autenticación fallida' });
        }

        const token = jwt.sign({ id: usuario.id, email: usuario.email, role: usuario.role }, 'your_secret_key', { expiresIn: '1h' });
        res.json({ message: 'Autenticación exitosa', token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};