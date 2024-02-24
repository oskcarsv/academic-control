const mongoose = require('mongoose');

const CursoUsuarioSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  cursoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Curso',
    required: true,
  },
    estado: {
        type: Boolean,
        default: true,
    },
});

module.exports = mongoose.model('CursoUsuario', CursoUsuarioSchema);
