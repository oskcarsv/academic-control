const Curso = require('../models/curso');
const Usuario = require('../models/usuario');


  function existenteCurso(value) {
    return Curso.findOne({ nombre: value }).then((curso) => {
      if (curso) {
        throw new Error('Ya existe un curso con ese nombre.');
      }
      return true;
    });
  }
  

  async function existeTeacher(value) {
    const usuario = await Usuario.findById(value);
    if (usuario == null) {
      throw new Error('TEacher ID is require');
    }
  
    if (!usuario) {
      throw new Error('The teacher with that ID does not exist.');
    } else {
      if (usuario.role == 'STUDENT_ROLE') {
        throw new Error('The ID must be that of a teacher.');
      }
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
    existeTeacher,
    existeCursoById
}