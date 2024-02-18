const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { existenteEmail, existeUsuarioById, esRolValido} = require('../helpers/db-validators');

const { usuariosPost, usuariosGet, getUsuarioByid, usuariosPut, usuariosDelete, login } = require('../controllers/user.controller');
const { validarJWT } = require('../middlewares/validar-jwt');
const { tieneRole } = require('../middlewares/validar-roles');

const router = Router();

router.get("/", usuariosGet);

router.post(
    "/", 
    [
        check("nombre","Name is required").not().isEmpty(),
        check("password","El password debe ser mayor a 6 caracteres").isLength({min: 6,}),
        check("correo","This email is not avaible").isEmail(),
        check("correo").custom(existenteEmail),
        check("role").custom(esRolValido),
        validarCampos,
    ], usuariosPost); 

router.get(
    "/:id",
    [
        check("id","El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ], getUsuarioByid);

router.put(
    "/:id",
    [
        check("id","El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ], usuariosPut);

router.delete(
        "/:id",
        [
            validarJWT,
            tieneRole('STUDENT_ROLE','TEACHER_ROLE'),
            check("id","El id no es un formato válido de MongoDB").isMongoId(),
            check("id").custom(existeUsuarioById),
            validarCampos
        ], usuariosDelete);

module.exports = router;