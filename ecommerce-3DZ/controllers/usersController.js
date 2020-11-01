//Requiero path y fs para trabajar con archivos:
const path = require('path');
const fs = require('fs');

//Requiero bcrypt para encriptar las contraseñas:
const bcrypt = require('bcrypt');

//Requiero los modelos de Bases de Datos:
const db = require('../database/models'); 

//Requiero Express-Validator para validar los datos de los formularios:
var{check, validationResult, body} = require('express-validator');

//Defino una variable con la ruta y archivo donde se almacenaran los usuarios:
const usersDataBase = path.join(__dirname,'..','data','usersDataBase.json');

//Leo la base de datos de users:
let usersDB = fs.readFileSync(usersDataBase,{encoding: 'utf-8'});


const usersController = {
  logIn: (req, res, next) => {
    res.render('users/login');
  },
  register: (req, res, next) => {
    res.render('users/register');
  },
//Base de Datos:
  create: (req,res) => {
    //Capturo los errores del formulario y analizo su existencia:
  let errors = (validationResult(req));
  console.log(errors);
// Continuo con las validaciones:
  if(errors.isEmpty()) {
  //Capturo los datos que vienen del formulario:
  let user = {
    user_name: req.body.userName,
    user_email: req.body.email,
    user_password: bcrypt.hashSync(req.body.password, 10),
  }
  //Escribo la base de datos con el nuevo usuario:
  db.Usuarios.create({
    nombreApellido: user.user_name,
    email: user.user_email,
    password: user.user_password 
  });
  req.session.userLogueado = user;
  res.redirect('/');
  } else {
  res.render('users/register', {errors: errors.errors});
};
},

processLogin: (req, res, next) => {
  let errors = (validationResult(req));
  console.log(errors);
   
  if(errors.isEmpty()) {
  
  //Validacion de contraseña:
  let userFind;
  db.Usuarios.findOne({
    where: {
      email: req.body.email
    }
  }).then(logUser => {
    if(bcrypt.compareSync(req.body.password, logUser.password)) { 
      userFind = logUser 
    }
    if (userFind == undefined) {
      return res.render('users/login', {errors: [{msg: 'Credenciales Invalidas'}]});
    } else {
      res.redirect('/');
    }
    //Configuro Session y Cookies:
    req.session.userLogueado = userFind;
    if(req.body.recordame != undefined) {
      res.cookie('recordame', userFind.email, {maxAge: 8.64e+7});
    }
  });
  console.log('El usuario en session es: ' + userFind);
  } else {
    return res.render('users/login', {errors: errors.errors})
  };
},

};

module.exports = usersController;