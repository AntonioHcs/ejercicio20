const Usuario = require('../models/usuario');

exports.agregarUsuario = async (req, res) => {
    const { nombre } = req.body;
    try {
        const usuario = new Usuario({ nombre });
        await usuario.save();
        res.status(201).json({ message: 'Usuario agregado con éxito', usuario });
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar usuario', error });
    }
};
