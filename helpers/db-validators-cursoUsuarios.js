const CursoUsuario = require('../models/cursoUsuario');
const Usuario = require('../models/usuario');
const Curso = require('../models/curso');


async function existeUsuarioById(value) {
  const usuario = await Usuario.findById(value);
  if (!usuario) {
    throw new Error('The student with that ID does not exist.');
  } else {
    if (usuario.role == 'TEACHER_ROLE') {
      throw new Error('The ID must be that of a student.');
    }
  }
  return true;
}

async function existeCursoById(value) {
  const curso = await Curso.findById(value);
  if (!curso) {
    throw new Error('The course with that ID does not exist.');
  }
  return true;
}

async function maximoDeAsignaciones(userId) {
  const asignacionesExistentes = await CursoUsuario.countDocuments({ userId });
  if (asignacionesExistentes >= 3) {
    throw new Error('Student has reached the maximum number of course assignments (3).');
  }
  return true;
}

module.exports = {
  existeUsuarioById,
  existeCursoById,
  maximoDeAsignaciones
};