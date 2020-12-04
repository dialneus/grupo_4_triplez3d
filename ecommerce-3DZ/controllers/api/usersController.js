//Requiero path y fs para trabajar con archivos:
const path = require('path');
const fs = require('fs');

//Requiero bcrypt para encriptar las contraseñas:
//const bcrypt = require('bcrypt');

//Requiero los modelos de Bases de Datos:
const db = require('../../database/models'); 

//Requiero Express-Validator para validar los datos de los formularios:
//var{check, validationResult, body} = require('express-validator');
//const { log } = require('console');
//const CarritoProducto = require('../../database/models/CarritoProducto');


const usersController = {
  list: (req, res, next) => {
    let url = req.url;
    db.Usuarios.findAll({
      where: {
        admin: 0,
        activo: 1
      }
   })
    .then((usuarios) => {
      let user = req.session.userLogueado;
      for (usuario of usuarios) {
        usuario.setDataValue('endpoint', '/api/users/' + usuario.id)
      }
      let usersResponse = {
        meta : {
          status: 200,
          total: usuarios.length,
          url: '/api/users'
        },
        data : usuarios/*{
          email: usuario.email,
          localidad: usuario.localidad,
          activo: usuario.activo,
          administrador: usuario.admin,
          //endpoint: '/api/users/' + usuario.id
        }*/
      }
      res.json(usersResponse);
    }).catch((err) => { console.log(err) });
  }
};

module.exports = usersController;