const express = require('express');
const router = express.Router();
const historialesMedicosController = require('../controllers/historialesMedicosController');
const { verifyToken } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /historialesMedicos/{id}:
 *   get:
 *     summary: Get medical history by ID
 *     description: Retrieve the medical history by its ID with token verification.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the medical history to retrieve
 *     responses:
 *       200:
 *         description: Medical history details
 *       404:
 *         description: Medical history not found
 */
router.get('/:id', verifyToken, historialesMedicosController.obtenerHistorialMedico);

/**
 * @swagger
 * /historialesMedicos/dni/{dni}:
 *   get:
 *     summary: Get medical history by DNI
 *     description: Retrieve the medical history by DNI with token verification.
 *     parameters:
 *       - in: path
 *         name: dni
 *         schema:
 *           type: string
 *         required: true
 *         description: DNI of the patient
 *     responses:
 *       200:
 *         description: Medical history details
 *       404:
 *         description: Medical history not found
 */
router.get('/dni/:dni', verifyToken, historialesMedicosController.buscarHistorialPorDNI);

/**
 * @swagger
 * /historialesMedicos/{id}:
 *   put:
 *     summary: Update medical history observations
 *     description: Update observations in the medical history by its ID with token verification.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the medical history to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               observaciones:
 *                 type: string
 *     responses:
 *       200:
 *         description: Medical history updated successfully
 *       404:
 *         description: Medical history not found
 */
router.put('/:id', verifyToken, historialesMedicosController.actualizarObservaciones);

module.exports = router;
