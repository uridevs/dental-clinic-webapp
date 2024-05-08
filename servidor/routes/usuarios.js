const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { requireRole } = require('../middlewares/roleMiddleware');

// router.get('/', usuariosController.listarUsuarios);
router.get('/', verifyToken, requireRole(["1"]), usuariosController.listarUsuarios);

module.exports = router;