const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { requireRole } = require('../middlewares/roleMiddleware');
const usuariosValidations = require('../validations/usuariosValidations');

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users with role-based token verification.
 *     responses:
 *       200:
 *         description: A list of users
 *       403:
 *         description: Access forbidden
 */
router.get('/', verifyToken, requireRole(["1"]), usuariosController.listarUsuarios);

/**
 * @swagger
 * /usuarios/cambiar-password:
 *   put:
 *     summary: Change password
 *     description: Change the password of a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Invalid input
 */
router.put('/cambiar-password', usuariosValidations.validarActualizarPass, verifyToken, usuariosController.cambiarPassword);

/**
 * @swagger
 * /usuarios/reset-password:
 *   put:
 *     summary: Reset password
 *     description: Reset the password of a user with role-based token verification.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       403:
 *         description: Access forbidden
 */
router.put('/reset-password', verifyToken, requireRole(["1"]), usuariosController.resetPassword);

module.exports = router;
