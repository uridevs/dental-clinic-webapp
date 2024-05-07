const express = require('express');
const router = express.Router();
const especialidadesController = require('../controllers/especialidadesController');

router.get('/', especialidadesController.listarEspecialidades);
router.post('/', especialidadesController.crearEspecialidad);
router.put('/:id', especialidadesController.modificarEspecialidad);
router.delete('/:id', especialidadesController.eliminarEspecialidad);

module.exports = router;