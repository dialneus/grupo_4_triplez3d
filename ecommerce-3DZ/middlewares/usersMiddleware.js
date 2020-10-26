//Requiero path y fs para trabajar con archivos:
const path = require('path');
const fs = require('fs');

//Requiero bcrypt para encriptar las contraseñas:
const bcrypt = require('bcrypt');

//Requiero Express-Validator para validar los datos de los formularios:
var{check, validationResult, body} = require('express-validator');

//Defino una variable con la ruta y archivo donde se almacenaran los usuarios:
const usersDataBase = path.join(__dirname,'..','data','usersDataBase.json');

//Leo la base de datos de users:
let usersDB = fs.readFileSync(usersDataBase,{encoding: 'utf-8'});

const usersMiddleware = {
  registerValidation: (req, res, next) => {
      check('userName').isLength().withMessage('El nombre debe estar completo.') ,
      check('email').isEmail().withMessage('El mail debe ser válido.') ,
      check('password').isLength({min:4}).withMessage('La constraseña debe tener al menos 4 carácteres.') ,
      body('email').custom(function(value) {
        //Valido el contenido de la base de datos de usuarios:
        if(usersDB == '') {
          users = [];
        } else {
          users = JSON.parse(usersDB);
        }
        for (let i=0; i < users.length; i++) {
          if (users[i].user_email == value) {
            return false;
          }
        }
        return true;
      }).withMessage('Usuario ya registrado'),
    next();
  },
};

module.exports = usersMiddleware;