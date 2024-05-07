// /routes/historialesMedicos.js
const express = require('express');
const router = express.Router();
const historialesMedicosController = require('../controllers/historialesMedicosController');

router.get('/:id', historialesMedicosController.obtenerHistorialMedico);

module.exports = router;