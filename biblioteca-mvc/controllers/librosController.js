const Libro = require('../models/libro');

exports.agregarLibro = async (req, res) => {
    const { titulo, autor, isbn } = req.body;
    try {
        const libro = new Libro({ titulo, autor, isbn });
        await libro.save();
        res.status(201).json({ message: 'Libro agregado con éxito', libro });
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar libro', error });
    }
};

exports.buscarLibros = async (req, res) => {
    const { parametro } = req.query;
    try {
        const libros = await Libro.find({ $or: [{ titulo: new RegExp(parametro, 'i') }, { autor: new RegExp(parametro, 'i') }] });
        res.status(200).json(libros);
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar libros', error });
    }
};

exports.prestarLibro = async (req, res) => {
    const { idLibro, idUsuario, fechaDevolucion } = req.body;
    try {
        const libro = await Libro.findById(idLibro);
        if (libro && !libro.prestado) {
            libro.prestado = true;
            libro.usuarioPrestamo = idUsuario;
            libro.fechaDevolucion = new Date(fechaDevolucion);
            await libro.save();
            res.status(200).json({ message: 'Libro prestado con éxito', libro });
        } else {
            res.status(400).json({ message: 'El libro ya está prestado o no existe' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al prestar libro', error });
    }
};

exports.devolverLibro = async (req, res) => {
    const { idLibro } = req.body;
    try {
        const libro = await Libro.findById(idLibro);
        if (libro && libro.prestado) {
            libro.prestado = false;
            libro.usuarioPrestamo = null;
            libro.fechaDevolucion = null;
            await libro.save();
            res.status(200).json({ message: 'Libro devuelto con éxito', libro });
        } else {
            res.status(400).json({ message: 'El libro no está prestado o no existe' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al devolver libro', error });
    }
};