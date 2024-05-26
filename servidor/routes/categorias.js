const express = require('express');
const router = express.Router();
const categoriasController = require('../controllers/categoriasController');
const { validarCrearCategoria, validarEliminarCategoria } = require('../validations/categoriasValidations');

/**
 * @swagger
 * /categorias:
 *   get:
 *     summary: Retrieve a list of categories
 *     description: Get a list of all categories.
 *     responses:
 *       200:
 *         description: A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 */
router.get('/', categoriasController.listarCategorias);

/**
 * @swagger
 * /categorias:
 *   post:
 *     summary: Create a new category
 *     description: Create a new category with a name.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', validarCrearCategoria, categoriasController.crearCategoria);

/**
 * @swagger
 * /categorias/{id}:
 *   delete:
 *     summary: Delete a category
 *     description: Delete a category by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the category to delete
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 */
router.delete('/:id', validarEliminarCategoria, categoriasController.eliminarCategoria);

module.exports = router;
