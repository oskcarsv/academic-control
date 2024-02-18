const Usuario = require('../models/usuario');
const Role = require('../models/role');

const existenteEmail = async (correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error(`Email ${ correo } already exists in database.`);
    }
}

const existeUsuarioById = async ( id = '') => {
    const existeUsuario = await Usuario.findOne({id});
    if(existeUsuario){
        throw new Error(`This user ${ id } not exists in database.`);
    }
}

const esRolValido = async (role='') => {
    const existeRol = await Role.findOne({role});

    if(existeRol){
        throw new Error(`This role ${ role } not exists in database.` )
    }
}

module.exports = {
    existenteEmail,
    existeUsuarioById,
    esRolValido
}