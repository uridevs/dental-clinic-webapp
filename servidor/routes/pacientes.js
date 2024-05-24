const express = require('express');
const router = express.Router();
const pacientesController = require('../controllers/pacientesController');
const pacientesValidations = require('../validations/pacientesValidations');

router.get('/dni', pacientesController.listarPacientePorDNI);  
router.get('/', pacientesController.listarPacientes);
router.get('/:id', pacientesController.listarPaciente);
router.post('/', pacientesValidations.validarCrearPaciente, pacientesController.crearPaciente);
router.put('/:id', pacientesValidations.validarActualizarPaciente, pacientesController.actualizarPaciente);
router.delete('/:id', pacientesController.eliminarPaciente);

module.exports = router;
