const { response, json } = require('express');
const Curso = require('../models/curso');

const cursosGet = async (req, res = response ) => {
    const { limite, desde } = req.query;
    const query = { estado: true};

    const [total, cursos] = await Promise.all([
        Curso.countDocuments(query),
        Curso.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        cursos
    });
} 


const cursosPut = async (req, res) => {
  try {
    const { cursoId, profesorId, ...resto } = req.body;

    if (!cursoId || !profesorId) {
      return res.status(400).json({ errors: [{ msg: 'Curso ID and Profesor ID are required' }] });
    }
    
    const curso = await Curso.findOne({ _id: cursoId });

    if (!curso) {
      return res.status(400).json({ errors: [{ msg: 'Course not found.' }] });
    }

    if (curso.profesor.toString() !== profesorId) {
      return res.status(403).json({ errors: [{ msg: 'Profesor does not have access to modify this course.' }] });
    }

    await Curso.findByIdAndUpdate(cursoId, resto);
    const cursoActualizado = await Curso.findOne({ _id: cursoId });

    res.status(200).json({
      msg: 'Curso Actualizado exitosamente',
      curso: cursoActualizado,
    });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: 'Error updating the course.' }] });
  }
};

const cursosDelete = async (req, res) => {
  try {
      const { cursoId, profesorId } = req.body;

      if (!cursoId || !profesorId) {
        return res.status(400).json({ errors: [{ msg: 'Curso ID and Profesor ID are required' }] });
      }
      
      const curso = await Curso.findOne({ _id: cursoId });
  
      if (!curso) {
        return res.status(400).json({ errors: [{ msg: 'Course not found.' }] });
      }
  
      if (curso.profesor.toString() !== profesorId) {
        return res.status(403).json({ errors: [{ msg: 'Profesor does not have access to delete this course.' }] });
      }

      await Curso.findByIdAndUpdate(cursoId, { estado: false });

      const cursoEliminado = await Curso.findOne({ _id: cursoId });

      res.status(200).json({
          msg: 'Curso eliminado exitosamente',
          curso: cursoEliminado
      });
  } catch (error) {
      res.status(500).json({ errors: [{ msg: 'Error deleting the course.' }] });
  }
};

const cursosPost = async (req, res) =>{
    const { nombre, descripcion, profesor} = req.body;
    const curso = new Curso({nombre, descripcion, profesor});

    await curso.save();
    res.status(200).json({
        curso
    });
}


const getCursosByProfesorId = async (req, res) => {
    try {
      const { profesorId } = req.body;
  
      const cursosDelProfesor = await Curso.find({ profesor: profesorId, estado: true })
        .populate({
          path: 'profesor',
          select: 'nombre',
        });

        if (cursosDelProfesor.length === 0) {
          return res.status(404).json({ errors: [{ msg: 'Profesor does not have any courses.' }] });
        }  
  
      const cursosInfo = cursosDelProfesor.map(curso => ({
        id: curso._id,
        nombre: curso.nombre,
        descripcion: curso.descripcion,
        profesor: curso.profesor.nombre,
      }));
  
      res.status(200).json({ cursosDelProfesor: cursosInfo });
    } catch (error) {
      res.status(500).json({ errors: [{ msg: 'Error retrieving courses for the professor.' }] });
    }
  };  

module.exports = {
    cursosDelete,
    cursosPost,
    cursosGet,
    cursosPut,
    getCursosByProfesorId
}