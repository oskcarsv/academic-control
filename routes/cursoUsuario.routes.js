const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { existeUsuarioById, existeCursoById , maximoDeAsignaciones, existeUsuarioYCursoAsignado} = require('../helpers/db-validators-cursoUsuarios');
const { cursoUsuariosPost, getCursosAsignadosByUserId } = require('../controllers/cursoUsuario.controller');

const { get } = require('http');

const router = Router();

router.post(
    "/", 
    [
        check("userId","The id is not a valid MongoDB format").isMongoId(),
        check("cursoId","The id is not a valid MongoDB format").isMongoId(),

        check('userId').custom(existeUsuarioById),
        check('cursoId').custom(existeCursoById),

        check('userId').custom(maximoDeAsignaciones),
                                                        
        validarCampos,
    ], cursoUsuariosPost); 


router.get(
    "/cursos-asignados", 
    [
        check("userId","The id is not a valid MongoDB format").isMongoId(),

        check('userId').custom(existeUsuarioYCursoAsignado),
        validarCampos,
    ],
    getCursosAsignadosByUserId);

module.exports = router;