// /routes/empleados.js
const express = require('express');
const router = express.Router();
const empleadosController = require('../controllers/empleadosController');
const empleadosValidations = require('../validations/empleadosValidations');

router.get('/', empleadosController.listarEmpleados);
router.get('/:id', empleadosController.listarEmpleado);
router.post('/', empleadosValidations.validarCrearEmpleado, empleadosController.crearEmpleado);
router.put('/:id', empleadosController.actualizarEmpleado);
router.delete('/:id', empleadosController.eliminarEmpleado);

module.exports = router;
