const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authValidations = require('../validations/authValidations');

router.post('/',authValidations.validarLogin, authController.login);

module.exports = router;