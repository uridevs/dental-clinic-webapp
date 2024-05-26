const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authValidations = require('../validations/authValidations');

/**
 * @swagger
 * /auth:
 *   post:
 *     summary: Login a user
 *     description: Authenticate a user with their credentials.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 */
router.post('/', authValidations.validarLogin, authController.login);

module.exports = router;
