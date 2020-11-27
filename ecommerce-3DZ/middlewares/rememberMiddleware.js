//Requiero path y fs para trabajar con archivos:
const path = require('path');
const fs = require('fs');

//Requiero los modelos de Bases de Datos:
const db = require('../database/models');

function rememberMiddleware(req, res, next) {
  if(req.cookies.recordame != undefined && req.session.userLogueado == undefined) {
      //console.log("a buscar el usuario " + req.cookies.recordame)
      let userFind;
      db.Usuarios.findOne({
        where: {
          email: req.cookies.recordame
        }
      }).then(logUser => {
        return req.session.userLogueado.email = logUser;
        /*userFind = logUser
        req.session.userLogueado = userFind;*/
        });
  };
  next();
};

module.exports = rememberMiddleware;