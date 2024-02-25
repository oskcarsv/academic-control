const mongoose = require('mongoose');

const CursoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del curso es obligatorio'],
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción del curso es obligatoria'],
  },
  profesor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: [true, 'Profesor ID is required']
  }, 
  estado:{
    type: Boolean,
    default: true
},
});

module.exports = mongoose.model('Curso', CursoSchema);
