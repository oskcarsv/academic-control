const Curso = require('../models/curso');


  function existenteCurso(value) {
    return Curso.findOne({ nombre: value }).then((curso) => {
      if (curso) {
        throw new Error('Ya existe un curso con ese nombre.');
      }
      return true;
    });
  }
  

  function existeTeacher(value) {
    return Curso.findOne({ profesor: value }).then((curso) => {
      if (curso) {
        throw new Error('El maestro ya está asignado a otro curso.');
      }
      return true;
    });
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