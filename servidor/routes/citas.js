const express = require('express');
const router = express.Router();
const citasController = require('../controllers/citasController');
const { validarCrearCita } = require('../validations/citasValidations');

router.get('/', citasController.listarCitas);
router.get('/paciente/:id', citasController.listarPorPaciente);
router.get('/doctor/:id', citasController.listarPorDoctor);
router.post('/', validarCrearCita, citasController.crearCita);
router.put('/:id', citasController.modificarCita); 
router.delete('/:id', citasController.eliminarCita); 

module.exports = router;
