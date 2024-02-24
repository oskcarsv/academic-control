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
    type: String,
    required: [true, 'El nombre del profesor del curso es obligatoria'],
  }, 
  estado:{
    type: Boolean,
    default: true
},
});

module.exports = mongoose.model('Curso', CursoSchema);
