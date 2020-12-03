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
    db.Usuarios.findAll()
    .then((usuarios) => {
      let user = req.session.userLogueado;
      
      for (let i = 0; i < usuarios.length; i++) {
        usuarios[i].setDataValue('endpoint', '/api/users/' + usuarios[i].id)
      }
      let usersResponse = {
        meta : {
          status: 200,
          total: usuarios.length,
          url: '/api/users'
        },
        data : usuarios
      }
      res.json(usersResponse);
    }).catch((err) => { console.log(err) });
  }
};

module.exports = usersController;