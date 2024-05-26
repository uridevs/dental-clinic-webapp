const express = require('express');
const router = express.Router();
const intervencionesController = require('../controllers/intervencionesController');

/**
 * @swagger
 * /intervenciones:
 *   get:
 *     summary: Get all interventions
 *     description: Retrieve a list of all interventions.
 *     responses:
 *       200:
 *         description: A list of interventions
 */
router.get('/', intervencionesController.listarIntervenciones);

/**
 * @swagger
 * /intervenciones/{id}:
 *   get:
 *     summary: Get intervention by ID
 *     description: Retrieve an intervention by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the intervention to retrieve
 *     responses:
 *       200:
 *         description: Intervention details
 *       404:
 *         description: Intervention not found
 */
router.get('/:id', intervencionesController.listarIntervencion);

/**
 * @swagger
 * /intervenciones/Dia/{fecha}:
 *   get:
 *     summary: Get interventions by date
 *     description: Retrieve interventions by a specific date.
 *     parameters:
 *       - in: path
 *         name: fecha
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Date of the interventions
 *     responses:
 *       200:
 *         description: A list of interventions on the specified date
 */
router.get('/Dia/:fecha', intervencionesController.listarIntervencionesPorDia);

/**
 * @swagger
 * /intervenciones/Paciente/{idPaciente}:
 *   get:
 *     summary: Get interventions by patient ID
 *     description: Retrieve interventions by patient ID.
 *     parameters:
 *       - in: path
 *         name: idPaciente
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the patient
 *     responses:
 *       200:
 *         description: A list of interventions for the patient
 *       404:
 *         description: Patient not found
 */
router.get('/Paciente/:idPaciente', intervencionesController.listarIntervencionesPorPaciente);

/**
 * @swagger
 * /intervenciones:
 *   post:
 *     summary: Create a new intervention
 *     description: Create a new intervention.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fecha:
 *                 type: string
 *                 format: date-time
 *               pacienteId:
 *                 type: integer
 *               tipo:
 *                 type: string
 *     responses:
 *       201:
 *         description: Intervention created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', intervencionesController.crearIntervencion);

/**
 * @swagger
 * /intervenciones/{id}:
 *   put:
 *     summary: Update an intervention
 *     description: Update an intervention by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the intervention to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fecha:
 *                 type: string
 *                 format: date-time
 *               pacienteId:
 *                 type: integer
 *               tipo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Intervention updated successfully
 *       404:
 *         description: Intervention not found
 */
router.put('/:id', intervencionesController.modificarIntervencion);

/**
 * @swagger
 * /intervenciones/{id}:
 *   delete:
 *     summary: Delete an intervention
 *     description: Delete an intervention by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the intervention to delete
 *     responses:
 *       200:
 *         description: Intervention deleted successfully
 *       404:
 *         description: Intervention not found
 */
router.delete('/:id', intervencionesController.borrarIntervencion);

module.exports = router;
