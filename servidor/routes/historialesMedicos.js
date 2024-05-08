// /routes/historialesMedicos.js
const express = require('express');
const router = express.Router();
const historialesMedicosController = require('../controllers/historialesMedicosController');

router.get('/:id', historialesMedicosController.obtenerHistorialMedico);
router.get('/dni/:dni', historialesMedicosController.buscarHistorialPorDNI);
router.put('/:id', historialesMedicosController.actualizarObservaciones);


module.exports = router;