const express = require('express');
const router = express.Router();
const especialidadesController = require('../controllers/especialidadesController');

/**
 * @swagger
 * /especialidades:
 *   get:
 *     summary: Get all specialties
 *     description: Retrieve a list of all specialties.
 *     responses:
 *       200:
 *         description: A list of specialties
 */
router.get('/', especialidadesController.listarEspecialidades);

/**
 * @swagger
 * /especialidades:
 *   post:
 *     summary: Create a new specialty
 *     description: Create a new specialty.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *     responses:
 *       201:
 *         description: Specialty created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', especialidadesController.crearEspecialidad);

/**
 * @swagger
 * /especialidades/{id}:
 *   put:
 *     summary: Update a specialty
 *     description: Update a specialty by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the specialty to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *     responses:
 *       200:
 *         description: Specialty updated successfully
 *       404:
 *         description: Specialty not found
 */
router.put('/:id', especialidadesController.modificarEspecialidad);

/**
 * @swagger
 * /especialidades/{id}:
 *   delete:
 *     summary: Delete a specialty
 *     description: Delete a specialty by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the specialty to delete
 *     responses:
 *       200:
 *         description: Specialty deleted successfully
 *       404:
 *         description: Specialty not found
 */
router.delete('/:id', especialidadesController.eliminarEspecialidad);

module.exports = router;
