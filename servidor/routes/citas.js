// citas.js (routes file)
const express = require('express');
const router = express.Router();
const citasController = require('../controllers/citasController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/', verifyToken, citasController.crearCita);
router.get('/', verifyToken, citasController.listarCitas);
router.get('/paciente/:id', verifyToken, citasController.listarPorPaciente);
router.get('/doctor/:id', verifyToken, citasController.listarPorDoctor);
router.put('/:id', verifyToken, citasController.modificarCita);
router.delete('/:id', verifyToken, citasController.eliminarCita);

module.exports = router;