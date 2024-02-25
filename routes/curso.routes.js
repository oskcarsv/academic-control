const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { existenteCurso, existeTeacher, existeCursoById} = require('../helpers/db-validators-cursos');

const { cursosPost, cursosGet, getCursoByid, cursosPut, cursosDelete, getCursosByProfesorId} = require('../controllers/cursos.controller');
const { get } = require('http');

const router = Router();

router.get("/", cursosGet);

router.post(
    "/", 
    [
        check('nombre', 'Name is required').not().isEmpty(),
        check('nombre').custom(existenteCurso),
        check("descripcion","Description is required").not().isEmpty(),
        check('profesor').custom(existeTeacher),
        validarCampos,
    ], cursosPost); 


router.put(
    "/:id",
    [
        check("id","The id is not a valid MongoDB format").isMongoId(),
        check("id").custom(existeCursoById),
        validarCampos
    ], cursosPut);

router.delete(
        "/:id",
        [
            check("id","The id is not a valid MongoDB format").isMongoId(),
            check("id").custom(existeCursoById),
            validarCampos
        ], cursosDelete);


router.get(
  "/cursos-maestro-posee",
  [
    check("profesorId","The id is not a valid MongoDB format").isMongoId(),
    check('profesorId').custom(existeTeacher),
    validarCampos,
  ],
  getCursosByProfesorId
);        

module.exports = router;