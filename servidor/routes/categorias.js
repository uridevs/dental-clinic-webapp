const express = require('express');
const router = express.Router();
const categoriasController = require('../controllers/categoriasController');
const { validarCrearCategoria, validarEliminarCategoria } = require('../validations/categoriasValidations');  // Asegúrate de crear este archivo y exportar las validaciones


router.get('/', categoriasController.listarCategorias);
router.post('/', validarCrearCategoria, categoriasController.crearCategoria);
router.delete('/:id', validarEliminarCategoria, categoriasController.eliminarCategoria);

module.exports = router;