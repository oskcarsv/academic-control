const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
// const { existenteCurso, existeTeacher, existeCursoById} = require('../helpers/db-validators-cursos');

const { cursoUsuariosPost } = require('../controllers/cursoUsuario.controller');
const { get } = require('http');

const router = Router();

// router.get("/", cursosGet);

router.post(
    "/", 
    [
        check('userId', 'userId is required').not().isEmpty(),
        check('cursoId', 'cursoId is required').not().isEmpty(),
        validarCampos,
    ], cursoUsuariosPost); 

module.exports = router;