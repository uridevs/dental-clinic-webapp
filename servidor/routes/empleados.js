const express = require('express');
const router = express.Router();
const empleadosController = require('../controllers/empleadosController');
const empleadosValidations = require('../validations/empleadosValidations');
const { verifyToken } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /empleados/dni:
 *   get:
 *     summary: Get employee by DNI
 *     description: Retrieve an employee by their DNI with token verification.
 *     responses:
 *       200:
 *         description: Employee details
 *       404:
 *         description: Employee not found
 */
router.get('/dni', verifyToken, empleadosController.listarEmpleadoPorDNI);

/**
 * @swagger
 * /empleados/doctores:
 *   get:
 *     summary: Get all doctors
 *     description: Retrieve a list of all doctors with token verification.
 *     responses:
 *       200:
 *         description: A list of doctors
 */
router.get('/doctores', verifyToken, empleadosController.listarDoctores);

/**
 * @swagger
 * /empleados:
 *   get:
 *     summary: Get all employees
 *     description: Retrieve a list of all employees with token verification.
 *     responses:
 *       200:
 *         description: A list of employees
 */
router.get('/', verifyToken, empleadosController.listarEmpleados);

/**
 * @swagger
 * /empleados/{id}:
 *   get:
 *     summary: Get employee by ID
 *     description: Retrieve an employee by their ID with token verification.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the employee to retrieve
 *     responses:
 *       200:
 *         description: Employee details
 *       404:
 *         description: Employee not found
 */
router.get('/:id', verifyToken, empleadosController.listarEmpleado);

/**
 * @swagger
 * /empleados:
 *   post:
 *     summary: Create a new employee
 *     description: Create a new employee with validation and token verification.
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
 *               puesto:
 *                 type: string
 *     responses:
 *       201:
 *         description: Employee created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', verifyToken, empleadosValidations.validacionesEmpleado, empleadosController.crearEmpleado);

/**
 * @swagger
 * /empleados/{id}:
 *   put:
 *     summary: Update an employee
 *     description: Update an employee by their ID with validation and token verification.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the employee to update
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
 *               puesto:
 *                 type: string
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *       404:
 *         description: Employee not found
 */
router.put('/:id', verifyToken, empleadosValidations.validacionesEmpleado, empleadosController.actualizarEmpleado);

/**
 * @swagger
 * /empleados/{id}:
 *   delete:
 *     summary: Delete an employee
 *     description: Delete an employee by their ID with token verification.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the employee to delete
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *       404:
 *         description: Employee not found
 */
router.delete('/:id', verifyToken, empleadosController.eliminarEmpleado);

module.exports = router;
