const { response, json } = require('express');
const CursoUsuario = require('../models/cursoUsuario');

const cursoUsuariosGet = async (req, res = response ) => {
    const { limite, desde } = req.query;
    const query = { estado: true};

    const [total, cursoUsuarios] = await Promise.all([
        CursoUsuario.countDocuments(query),
        CursoUsuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        cursoUsuarios
    });
} 

const getCursoUsuariosByid = async (req, res) => {
    const { id } = req.params;
    const cursoUsuarios = await CursoUsuario.findOne({_id: id});

    res.status(200).json({
        cursoUsuarios
    });
}

const cursoUsuariosPost = async (req, res) => {
    try {
      const { userId, cursoId } = req.body;
  
      const asignacionExistente = await CursoUsuario.findOne({ userId, cursoId });
      if (asignacionExistente) {
        return res.status(400).json({ errors: [{ msg: 'Student has already been assigned to this course.' }] });
      }
  
      const cursoUsuarios = new CursoUsuario({ userId, cursoId });
      await cursoUsuarios.save();
  
      await cursoUsuarios.populate('cursoId');
      await cursoUsuarios.populate('userId');
  
      res.status(200).json({
        message: `Successful assignment to the course '${cursoUsuarios.cursoId.nombre}' for the student '${cursoUsuarios.userId.nombre}'.`,
      });
    } catch (error) {
      res.status(400).json({ errors: [{ msg: error.message }] });
    }
  };
  
  
module.exports = {
    cursoUsuariosPost,
    cursoUsuariosGet,
    getCursoUsuariosByid,
}