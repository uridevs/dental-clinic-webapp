const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { requireRole } = require('../middlewares/roleMiddleware');
const usuariosValidations = require('../validations/usuariosValidations');

// router.get('/', usuariosController.listarUsuarios);
router.get('/', verifyToken, requireRole(["1"]), usuariosController.listarUsuarios);
router.put('/cambiar-password', usuariosValidations.validarActualizarPass, verifyToken, usuariosController.cambiarPassword);

module.exports = router;