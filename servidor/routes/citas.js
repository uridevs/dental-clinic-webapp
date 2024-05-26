const express = require('express');
const router = express.Router();
const citasController = require('../controllers/citasController');
const { verifyToken } = require('../middlewares/authMiddleware');
const citasValidations = require('../validations/citasValidations');

/**
 * @swagger
 * /citas:
 *   post:
 *     summary: Create a new appointment
 *     description: Create a new appointment with validation and token verification.
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
 *               doctorId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Appointment created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', citasValidations.validarCrearCita, verifyToken, citasController.crearCita);

/**
 * @swagger
 * /citas/proximas:
 *   get:
 *     summary: Get upcoming appointments
 *     description: Retrieve a list of upcoming appointments with token verification.
 *     responses:
 *       200:
 *         description: A list of upcoming appointments
 */
router.get('/proximas', verifyToken, citasController.listarCitasProximas);

/**
 * @swagger
 * /citas:
 *   get:
 *     summary: Get all appointments
 *     description: Retrieve a list of all appointments with token verification.
 *     responses:
 *       200:
 *         description: A list of appointments
 */
router.get('/', verifyToken, citasController.listarCitas);

/**
 * @swagger
 * /citas/{id}:
 *   get:
 *     summary: Get appointment by ID
 *     description: Retrieve an appointment by its ID with token verification.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the appointment to retrieve
 *     responses:
 *       200:
 *         description: Appointment details
 *       404:
 *         description: Appointment not found
 */
router.get('/:id', verifyToken, citasController.listarCita);

/**
 * @swagger
 * /citas/paciente/{id}:
 *   get:
 *     summary: Get appointments by patient ID
 *     description: Retrieve appointments by patient ID with token verification.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the patient
 *     responses:
 *       200:
 *         description: A list of appointments for the patient
 *       404:
 *         description: Patient not found
 */
router.get('/paciente/:id', verifyToken, citasController.listarPorPaciente);

/**
 * @swagger
 * /citas/doctor/{id}:
 *   get:
 *     summary: Get appointments by doctor ID
 *     description: Retrieve appointments by doctor ID with token verification.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the doctor
 *     responses:
 *       200:
 *         description: A list of appointments for the doctor
 *       404:
 *         description: Doctor not found
 */
router.get('/doctor/:id', verifyToken, citasController.listarPorDoctor);

/**
 * @swagger
 * /citas/{id}:
 *   put:
 *     summary: Update an appointment
 *     description: Update an appointment by its ID with token verification.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the appointment to update
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
 *               doctorId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Appointment updated successfully
 *       404:
 *         description: Appointment not found
 */
router.put('/:id', verifyToken, citasController.modificarCita);

/**
 * @swagger
 * /citas/{id}:
 *   delete:
 *     summary: Delete an appointment
 *     description: Delete an appointment by its ID with token verification.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the appointment to delete
 *     responses:
 *       200:
 *         description: Appointment deleted successfully
 *       404:
 *         description: Appointment not found
 */
router.delete('/:id', verifyToken, citasController.eliminarCita);

module.exports = router;
