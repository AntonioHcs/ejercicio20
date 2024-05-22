const express = require('express');
const router = express.Router();
const librosController = require('../controllers/librosController');

router.post('/agregar', librosController.agregarLibro);
router.get('/buscar', librosController.buscarLibros);
router.post('/prestar', librosController.prestarLibro);
router.post('/devolver', librosController.devolverLibro);

module.exports = router;
