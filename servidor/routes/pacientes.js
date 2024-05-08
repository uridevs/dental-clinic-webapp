// /routes/pacientes.js
const express = require('express');
const router = express.Router();
const pacientesController = require('../controllers/pacientesController');
const pacientesValidations = require('../validations/pacientesValidations');

router.get('/', pacientesController.listarPacientes);
router.get('/:id', pacientesController.listarPaciente);
router.post('/',pacientesValidations.validarCrearPaciente, pacientesController.crearPaciente);
router.put('/:id', pacientesController.actualizarPaciente);
router.delete('/:id', pacientesController.eliminarPaciente);

module.exports = router;
