const Usuario = require('../models/usuario');
const Curso = require('../models/curso');

// const existenteCurso = async (curso = '') => {
//     const existeCurso = await Curso.findOne({curso});
//     if(existeCurso){
//         throw new Error(`Curso ${ curso } already exists in database.`);
//     }
// }

function existenteCurso(value) {
    return Curso.findOne({ nombre: value }).then((curso) => {
      if (curso) {
        throw new Error('Ya existe un curso con ese nombre.');
      }
      return true;
    });
  }
  

// const existeTeacherById = async ( id = '') => {
//     const existeUsuario = await Usuario.findOne({id});
//     if(existeUsuario){
//         throw new Error(`This teacher ${ id } not exists in database.`);
//     }
// }

async function existeTeacherById(value) {
    const profesor = await Usuario.findById(value);
    if (!profesor) {
      throw new Error('El profesor con ese ID no existe.');
    }
    return true;
  }
  

const existeCursoById = async ( id = '') => {
    const existeCurso = await Curso.findOne({id});
    if(existeCurso){
        throw new Error(`This curso  ${ id } not exists in database.`);
    }
}


module.exports = {
    existenteCurso,
    existeTeacherById,
    existeCursoById
}