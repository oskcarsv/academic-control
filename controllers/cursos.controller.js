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
    const { id } = req.params;
    const { _id, descripcion, profesor, ...resto} = req.body;
    await Curso.findByIdAndUpdate(id, resto);

    const curso = await Curso.findOne({_id: id});

    res.status(200).json({
        msg: 'Curso Actualizado exitosamente',
        curso
    })
}

const cursosDelete = async (req, res) => {
    const {id} = req.params;
    await Curso.findByIdAndUpdate(id,{estado: false});

    const curso = await Curso.findOne({_id: id});

    res.status(200).json({
        msg: 'Curso a eliminar',
        curso
    });
}

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
  
      const cursosInfo = cursosDelProfesor.map(curso => ({
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