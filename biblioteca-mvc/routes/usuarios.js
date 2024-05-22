const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

router.post('/agregar', usuariosController.agregarUsuario);

module.exports = router;
