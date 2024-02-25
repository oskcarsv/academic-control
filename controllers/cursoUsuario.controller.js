const { response, json } = require('express');
const CursoUsuario = require('../models/cursoUsuario');


const cursoUsuariosPost = async (req, res) => {
    try {
      const { userId, cursoId } = req.body;
  
      const asignacionExistente = await CursoUsuario.findOne({ userId, cursoId });
      if (asignacionExistente) {
        return res.status(400).json({ 
            errors: [{ msg: 'Student has already been assigned to this course.' 
        }] });
      }
  
      const cursoUsuarios = new CursoUsuario({ userId, cursoId });
      await cursoUsuarios.save();
  
      await cursoUsuarios.populate('cursoId');
      await cursoUsuarios.populate('userId');
  
      res.status(200).json({
        message: `Successful assignment to the course '${cursoUsuarios.cursoId.nombre}' for the student '${cursoUsuarios.userId.nombre}'.`,
      });
    } catch (error) {
      res.status(400).json({ 
        errors: [{ msg: error.message }] 
      });
    }
  };

  const getCursosAsignadosByUserId = async (req, res) => {
    try {
      const { userId } = req.body;
  
      const cursosAsignados = await CursoUsuario.find({ userId: userId })
        .populate({
          path: 'cursoId',
          select: 'nombre profesor',
        });
  
      const cursosInfo = cursosAsignados.map(asignacion => ({
        curso: asignacion.cursoId.nombre,
        profesor: asignacion.cursoId.profesor,
      }));
  
      res.status(200).json({ 
        cursosAsignados: cursosInfo 
      });

    } catch (error) {
      res.status(500).json({ 
        errors: [{ msg: 'Error retrieving assigned courses.' 
      }] });
    }
  };  
  
module.exports = {
    cursoUsuariosPost,
    getCursosAsignadosByUserId
}