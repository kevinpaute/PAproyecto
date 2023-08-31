const express = require('express');
const router = express.Router();

// Importa tus controladores y modelos necesarios
const authController = require('../controllers/authController');

// Definición de rutas
router.post('/login', authController.login);

module.exports = router;
