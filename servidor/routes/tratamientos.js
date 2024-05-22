const express = require('express');
const router = express.Router();
const tratamientosController = require('../controllers/tratamientosController');

router.get('/especialidad', tratamientosController.listarTratamientosPorEspecialidad);
router.get('/', tratamientosController.listarTratamientos);
router.post('/', tratamientosController.crearTratamiento);
router.put('/:id', tratamientosController.actualizarTratamiento);
router.delete('/:id', tratamientosController.eliminarTratamiento);

module.exports = router;

