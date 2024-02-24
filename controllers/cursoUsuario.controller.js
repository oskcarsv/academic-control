const { response, json } = require('express');

const CursoUsuario = require('../models/cursoUsuario');
const Usuario = require('../models/usuario');
const Curso = require('../models/curso');



const cursoUsuariosPost = async (req, res) =>{
    const { userId, cursoId} = req.body;
    const cursoUsuario = new CursoUsuario({userId, cursoId});

    await cursoUsuario.save();
    res.status(200).json({
        cursoUsuario
    });
}




// async function asignarCurso(userId, cursoId) {
//   const usuario = await Usuario.findById(userId);
//   const curso = await Curso.findById(cursoId);

//   if (!usuario || !curso) {
//     throw new Error('Usuario o curso no encontrado');
//   }

//   // Lógica para estudiantes
//   if (usuario.role === 'STUDENT_ROLE') {
//     const cursosAsignados = await CursoUsuario.countDocuments({ usuarioId });
//     if (cursosAsignados >= 3) {
//       throw new Error('Alumnos no pueden tener más de 3 cursos asignados');
//     }
//   }

//   // Verificar si la asignación ya existe
//   const asignacionExistente = await CursoUsuario.findOne({ userId, cursoId });
//   if (asignacionExistente) {
//     throw new Error('El usuario ya está asignado a este curso');
//   }

//   // Crear la asignación
//   const nuevaAsignacion = new CursoUsuario({ userId, cursoId });
//   await nuevaAsignacion.save();

//   return nuevaAsignacion;
// }


// // En el controlador de cursos o en un controlador dedicado a asignaciones
// const { response } = require('express');
// const { asignarCurso } = require('./helpers'); // Suponiendo que has colocado la función en un archivo 'helpers'.

// const asignarCursoAUsuario = async (req, res = response) => {
//   try {
//     const { userId, cursoId } = req.body;
//     const asignacion = await asignarCurso(userId, cursoId);

//     res.status(201).json({
//       msg: 'Curso asignado correctamente',
//       asignacion,
//     });
//   } catch (error) {
//     res.status(400).json({
//       msg: error.message,
//     });
//   }
// };

module.exports = { 
    cursoUsuariosPost
};
