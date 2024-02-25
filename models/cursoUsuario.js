const mongoose = require('mongoose');

const CursoUsuarioSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: [true, 'UserId is required']
  },
  cursoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Curso',
    required: [true, 'CourseId is required']
  },
    estado: {
        type: Boolean,
        default: true,
    },
});

module.exports = mongoose.model('CursoUsuario', CursoUsuarioSchema);
