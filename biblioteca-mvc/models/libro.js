const mongoose = require('mongoose');

const libroSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    autor: { type: String, required: true },
    isbn: { type: String, required: true },
    prestado: { type: Boolean, default: false },
    usuarioPrestamo: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', default: null },
    fechaDevolucion: { type: Date, default: null }
});

module.exports = mongoose.model('Libro', libroSchema);
