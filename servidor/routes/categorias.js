const express = require('express');
const router = express.Router();
const categoriasController = require('../controllers/categoriasController');

router.get('/', categoriasController.listarCategorias);
router.post('/', categoriasController.crearCategoria);

module.exports = router;