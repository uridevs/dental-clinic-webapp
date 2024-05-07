// /routes/intervenciones.js
const express = require('express');
const router = express.Router();
const intervencionesController = require('../controllers/intervencionesController');

router.get('/Dia/:fecha', intervencionesController.listarIntervencionesPorDia);
router.get('/Paciente/:idPaciente', intervencionesController.listarIntervencionesPorPaciente);
router.post('/', intervencionesController.crearIntervencion);
router.put('/:id', intervencionesController.modificarIntervencion);
router.delete('/:id', intervencionesController.borrarIntervencion);

module.exports = router;
