//Requiero path y fs para trabajar con archivos:
const path = require('path');
const fs = require('fs');

//Requiero bcrypt para encriptar las contraseñas:
const bcrypt = require('bcrypt');

//Requiero los modelos de Bases de Datos:
const db = require('../database/models'); 

//Requiero Express-Validator para validar los datos de los formularios:
var{check, validationResult, body} = require('express-validator');
const { log } = require('console');


const usersController = {
  chart: (req, res) => {
    res.render('users/carrito', { title: 'Carrito de Compras 3DZ' });
  },
  logIn: (req, res, next) => {
    res.render('users/login');
  },
  register: (req, res, next) => {
    res.render('users/register');
  },
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
  }).then(() => {
    req.session.userLogueado = user;
    res.redirect('/');
  });
  } else {
  res.render('users/register', {errors: errors.errors});
  };
},
  processLogin: (req, res, next) => {
    let errors = (validationResult(req));
      
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
          //Configuro Session y Cookies:
          req.session.userLogueado = userFind;
          console.log('El id del usuario en session es: ' + req.session.userLogueado.id);//agregado
          res.redirect('/');
          if(req.body.recordame != undefined) {
            res.cookie('recordame', userFind.email, {maxAge: 8.64e+7});
        }
        }
        
      });
      
      } else {
        return res.render('users/login', {errors: errors.errors})
      };
  },
  list: (req, res, next) => {
    db.Usuarios.findAll()
    .then((usuarios) => {
      res.render('users/usersList', {usuarios: usuarios})
    })
  },
  detail: (req, res, next) => {
    db.Usuarios.findByPk(req.params.id)
      .then((usuario) => {
        userId = req.params.id;
        res.render('users/userDetail', {usuario: usuario, userId: userId});
      })
  },
  edit: (req, res, next) => {
    db.Usuarios.findByPk(req.params.id)
      .then((usuario) => {
        res.render('users/userEdit', {usuario: usuario});
      })
  },
  update: (req, res, next) => {
    //Capturo los datos que vienen del formulario:
    let user = {
      user_name: req.body.userName,
      user_email: req.body.email,
      user_domicilio: req.body.domicilio,
      user_localidad: req.body.localidad,
      user_telefono: Number(req.body.telefono),
    }
    //Grabo los datos en la base de Datos:
    db.Usuarios.update({
      nombreApellido: user.user_name,
      email: user.user_email,
      domicilio: user.user_domicilio,
      localidad: user.user_localidad,
      telefono: user.user_telefono
    }, {
      where: {
        id: req.params.id
      }
    });
    res.redirect('/users/' + req.params.id)
  },
  checkout: (req,res,next) => {
    req.session.destroy((err) => {
      res.redirect('/')
    });
  },

};

module.exports = usersController;