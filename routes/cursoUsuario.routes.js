const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { existeUsuarioById, existeCursoById , maximoDeAsignaciones} = require('../helpers/db-validators-cursoUsuarios');
const { cursoUsuariosGet, getCursoUsuariosByid, cursoUsuariosPost } = require('../controllers/cursoUsuario.controller');

const { get } = require('http');

const router = Router();

router.get("/", cursoUsuariosGet);

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
    "/:id",
    [
        check("id","El id no es un formato válido de MongoDB").isMongoId(),
        // check("id").custom(existeCursoById),
        validarCampos
    ], getCursoUsuariosByid);


module.exports = router;