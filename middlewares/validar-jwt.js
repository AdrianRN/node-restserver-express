const { response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async(req, res = response, next) => {
    
    const token = req.header('x-token');


    if(!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }


    try {
        // El uid viene dentro del token
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // leer el usuario que corresponde la uid
        const usuario = await Usuario.findById(uid);

        if(!usuario) {
            return res.status(401).json({
                msg: 'Token no valido - Usuario no existe en DB'
            })
        }


        // Verificar si el usuario tiene estado en true (dado de alta)
        if(!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no valido - Usuario con estado false (dado de baja)'
            })
        }


        req.usuario = usuario;

        next()
        

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Token no valido'
        })
    }

}

module.exports = {
    validarJWT
}