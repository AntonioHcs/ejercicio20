const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');
const librosRoutes = require('./routes/libros');
const usuariosRoutes = require('./routes/usuarios');

const app = express();
app.use(bodyParser.json());

app.use('/libros', librosRoutes);
app.use('/usuarios', usuariosRoutes);

app.get('/', (req, res) => {
    res.send('Sistema de Gestión de Bibliotecas');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
