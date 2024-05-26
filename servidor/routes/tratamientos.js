const express = require('express');
const router = express.Router();
const tratamientosController = require('../controllers/tratamientosController');

/**
 * @swagger
 * /tratamientos/especialidad:
 *   get:
 *     summary: Get treatments by specialty
 *     description: Retrieve treatments by specialty.
 *     responses:
 *       200:
 *         description: A list of treatments for the specialty
 */
router.get('/especialidad', tratamientosController.listarTratamientosPorEspecialidad);

/**
 * @swagger
 * /tratamientos:
 *   get:
 *     summary: Get all treatments
 *     description: Retrieve a list of all treatments.
 *     responses:
 *       200:
 *         description: A list of treatments
 */
router.get('/', tratamientosController.listarTratamientos);

/**
 * @swagger
 * /tratamientos:
 *   post:
 *     summary: Create a new treatment
 *     description: Create a new treatment.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               especialidadId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Treatment created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', tratamientosController.crearTratamiento);

/**
 * @swagger
 * /tratamientos/{id}:
 *   put:
 *     summary: Update a treatment
 *     description: Update a treatment by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the treatment to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               especialidadId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Treatment updated successfully
 *       404:
 *         description: Treatment not found
 */
router.put('/:id', tratamientosController.actualizarTratamiento);

/**
 * @swagger
 * /tratamientos/{id}:
 *   delete:
 *     summary: Delete a treatment
 *     description: Delete a treatment by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the treatment to delete
 *     responses:
 *       200:
 *         description: Treatment deleted successfully
 *       404:
 *         description: Treatment not found
 */
router.delete('/:id', tratamientosController.eliminarTratamiento);

module.exports = router;

