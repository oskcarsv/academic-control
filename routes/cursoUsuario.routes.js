const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { existeUsuarioById, existeCursoById , maximoDeAsignaciones} = require('../helpers/db-validators-cursoUsuarios');
const { cursoUsuariosPost, getCursosAsignadosByUserId } = require('../controllers/cursoUsuario.controller');

const { get } = require('http');

const router = Router();

router.post(
    "/", 
    [
        check('userId', 'User ID is require').not().isEmpty(),
        check('userId').custom(existeUsuarioById),

        check('cursoId', 'Curso ID is require').not().isEmpty(),
        check('cursoId').custom(existeCursoById), 

        check('userId').custom(maximoDeAsignaciones),
                                                        
        validarCampos,
    ], cursoUsuariosPost); 


router.get(
    "/cursos-asignados", 
    [
        check('userId', 'User ID is require').not().isEmpty(),
        check('userId').custom(existeUsuarioById),
        validarCampos,
    ],
    getCursosAsignadosByUserId);



module.exports = router;