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

const usersController = {
  logIn: (req, res, next) => {
    res.render('users/login', { title: 'Ingresá a tu cuenta de 3DZ impresiones' });
  },
  register: (req, res, next) => {
    res.render('users/register')//, { title: 'Registrate en 3DZ impresiones' });
  },

/*Metodos HTTP*/
  create: (req,res,next) => {
    //Capturo los errores del formulario y analizo su existencia:
    let errors = (validationResult(req));
    console.log(errors);
    if(errors.isEmpty()) {
    //Creo la variable users:
    let users;
    //Capturo los datos que vienen del formulario:
    let user = {
      user_name: req.body.userName,
      user_email: req.body.email,
      user_password: bcrypt.hashSync(req.body.password, 10),
    }
  
    //Valido el contenido de la base de datos de usuarios:
    if(usersDB == '') {
      users = [];
    } else {
      users = JSON.parse(usersDB);
    }
    
    //Agrego en la base de users al nuevo usuario, incorporando número de id:
    if (users.length >0) {
      user.user_id = users[users.length-1].user_id + 1;
    } else {
      user.user_id = 1;
    };
    users.push(user);

    //Convierto la variable en formato JSON:
    let usersJSON = JSON.stringify(users);
  
    //Escribo la base de datos con el nuevo usuario:
    fs.writeFileSync(usersDataBase,usersJSON);
    //res.send(users);
    res.send('Usuario registrado exitosamente!!');
    req.session.userLogueado = user;
    //res.redirect('/');
  } else {
    //res.send('Error en el formulario');
    res.render('users/register', {errors: errors.errors});
  };
  },
  enter: (req,res,next) => {
    let users = JSON.parse(usersDB);
    let userFind;
    for(var i = 0; i <users.length; i++) {
      if(users[i].user_email == req.body.email) {
        if(bcrypt.compareSync(req.body.password, users[i].user_password)) {
          userFind = users[i];
          break;
        }  
      }
    }
    if(userFind){
      res.send('Bienvenido ' + userFind.user_name);
    } else {
      res.send('Usuario y/o Contraseña invalida');
      //res.render('users/login', { title: 'Ingresá a tu cuenta de 3DZ impresiones'}, {errorLogueo:'Usuario y/o contraseña invalida'});
    }
  },
  processLogin: (req, res, next) => {
    let errors = (validationResult(req));
    console.log(errors);
    if(errors.isEmpty()) {
    //Valido el contenido de la base de datos de usuarios:
    if(usersDB == '') {
      users = [];
    } else {
      users = JSON.parse(usersDB);
    }
    let userFind;
    for(var i = 0; i <users.length; i++) {
      if(users[i].user_email == req.body.email) {
        if(bcrypt.compareSync(req.body.password, users[i].user_password)) {
          userFind = users[i];
          break;
        }  
      }
    }
    req.session.userLogueado = userFind;
    if (userFind == undefined) {
      return res.render('users/login', {errors: [{msg: 'Credenciales Invalidas'}]});
    }
        
    if(req.body.recordame != undefined) {
      res.cookie('recordame', userFind.user_email, {maxAge: 8.64e+7});
    }
    res.send('Bienvenido ' + userFind.user_name);
    } else {
      return res.render('users/login', {errors: errors.errors})
    };
  },

/*Pruebas de listados de usuarios*/
  list: (req, res, next) => {
    let users = JSON.parse(usersDB);
    res.render('users/usersList',{users});
  },
  detail: (req, res, next) => {
    let usuarioConsultado = req.query.consulta;
    let users = JSON.parse(usersDB);
//string.toLowerCase()    
    let usersResults = [];

    for(usuario of users) {
      if(usuario.user_name.includes(usuarioConsultado)) {
        usersResults.push(usuario);
      }
    }
    res.render('users/userDetail',{usuarioConsultado, usersResults});
  },
};

module.exports = usersController;