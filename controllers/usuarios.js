const {response} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');


const usuariosGet = async(req, res = response) => {
  
    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true}

      const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
          .limit(limite)
          .skip(desde)
      ]);
    res.json({
      total,
      usuarios
      // total,
      // usuarios
    })
  }

const usuariosPost = async(req, res) => {

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    // Encriptar la contraseña - hash
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt)

    
    // Guardar en DB
    await usuario.save();

    res.json({
        usuario
    })
  }

const usuariosPut = async(req, res) => {

    const {id} = req.params;
    const {_id, password, google, correo, ...resto} = req.body;

    if(password) {
      // Encriptar la contraseña - hash
      const salt = bcryptjs.genSaltSync();
      resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto, {new: true})

    res.json({
        usuario
    })
  }

const usuariosPatch = (req, res) => {
    res.json({
        msg: 'patch API - controlador'
    })
  }

const usuariosDelete = async(req, res) => {

    const {id} = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false}, {new: true});
    // const usuarioAutenticado = req.usuario;


    res.json({
        usuario,
        // usuarioAutenticado
    })
  }


  module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete

  }