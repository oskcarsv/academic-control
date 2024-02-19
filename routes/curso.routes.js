const { Router } = require('express');
const { check } = require('express-validator');

const { validarCamposCursos } = require('../middlewares/validar-campos-cursos');
const { existenteCurso, existeTeacherById, existeCursoById} = require('../helpers/db-validators-cursos');

const { cursosPost, cursosGet, getCursoByid, cursosPut, cursosDelete } = require('../controllers/cursos.controller');
const { get } = require('http');

const router = Router();

router.get("/", cursosGet);

router.post(
    "/", 
    [
        check('nombre', 'El nombre del curso es obligatorio').not().isEmpty(),
        check('nombre').custom(existenteCurso),
        check("descripcion","Description is required").not().isEmpty(),
        check('profesor', 'El profesor con ese ID no existe').not().isEmpty(),
        check('profesor').custom(existeTeacherById),
        validarCamposCursos,
    ], cursosPost); 

router.get(
    "/:id",
    [
        check("id","El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeCursoById),
        validarCamposCursos
    ], getCursoByid);

router.put(
    "/:id",
    [
        check("id","El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeCursoById),
        validarCamposCursos
    ], cursosPut);

router.delete(
        "/:id",
        [
            check("id","El id no es un formato válido de MongoDB").isMongoId(),
            check("id").custom(existeCursoById),
            validarCamposCursos
        ], cursosDelete);

module.exports = router;