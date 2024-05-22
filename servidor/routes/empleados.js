// /routes/empleados.js
const express = require('express');
const router = express.Router();
const empleadosController = require('../controllers/empleadosController');
const empleadosValidations = require('../validations/empleadosValidations');
const { verifyToken } = require('../middlewares/authMiddleware');


router.get('/doctores', empleadosController.listarDoctores);
router.get('/', empleadosController.listarEmpleados);
router.get('/:id', empleadosController.listarEmpleado);
router.post('/', empleadosValidations.validacionesEmpleado, empleadosController.crearEmpleado);
router.put('/:id', empleadosValidations.validacionesEmpleado, empleadosController.actualizarEmpleado);
router.delete('/:id', empleadosController.eliminarEmpleado);

module.exports = router;
