const express = require('express');
const router = express.Router();
const pacientesController = require('../controllers/pacientesController');
const pacientesValidations = require('../validations/pacientesValidations');
const { verifyToken } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /pacientes/dni:
 *   get:
 *     summary: Get patient by DNI
 *     description: Retrieve a patient by their DNI with token verification.
 *     responses:
 *       200:
 *         description: Patient details
 *       404:
 *         description: Patient not found
 */
router.get('/dni', verifyToken, pacientesController.listarPacientePorDNI);

/**
 * @swagger
 * /pacientes:
 *   get:
 *     summary: Get all patients
 *     description: Retrieve a list of all patients with token verification.
 *     responses:
 *       200:
 *         description: A list of patients
 */
router.get('/', verifyToken, pacientesController.listarPacientes);

/**
 * @swagger
 * /pacientes/{id}:
 *   get:
 *     summary: Get patient by ID
 *     description: Retrieve a patient by their ID with token verification.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the patient to retrieve
 *     responses:
 *       200:
 *         description: Patient details
 *       404:
 *         description: Patient not found
 */
router.get('/:id', verifyToken, pacientesController.listarPaciente);

/**
 * @swagger
 * /pacientes:
 *   post:
 *     summary: Create a new patient
 *     description: Create a new patient with validation and token verification.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               dni:
 *                 type: string
 *               fechaNacimiento:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Patient created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', verifyToken, pacientesValidations.validarCrearPaciente, pacientesController.crearPaciente);

/**
 * @swagger
 * /pacientes/{id}:
 *   put:
 *     summary: Update a patient
 *     description: Update a patient by their ID with validation and token verification.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the patient to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               dni:
 *                 type: string
 *               fechaNacimiento:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Patient updated successfully
 *       404:
 *         description: Patient not found
 */
router.put('/:id', verifyToken, pacientesValidations.validarActualizarPaciente, pacientesController.actualizarPaciente);

/**
 * @swagger
 * /pacientes/{id}:
 *   delete:
 *     summary: Delete a patient
 *     description: Delete a patient by their ID with token verification.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the patient to delete
 *     responses:
 *       200:
 *         description: Patient deleted successfully
 *       404:
 *         description: Patient not found
 */
router.delete('/:id', verifyToken, pacientesController.eliminarPaciente);

module.exports = router;
