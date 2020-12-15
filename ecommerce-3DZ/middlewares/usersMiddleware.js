//Requiero path y fs para trabajar con archivos:
const path = require('path');
const fs = require('fs');

//Requiero bcrypt para encriptar las contraseñas:
const bcrypt = require('bcrypt');

//Requiero Express-Validator para validar los datos de los formularios:
var{check, validationResult, body} = require('express-validator');

//Requiero los modelos de Bases de Datos:
const db = require('../database/models'); 


const usersMiddleware = {
  login: [
    check('email').isEmail().withMessage('El mail debe ser válido y debe estar completo.') ,
    check('password').isLength({min:4}).withMessage('La contraseña debe tener al menos 4 carácteres.') ,
  //Validacion de mail:
    body('email').custom(value => {
      return db.Usuarios.findOne({
        where: {
          email: value
        }
      }).then((newUser) => {
        if (!newUser) {
          return Promise.reject('Usuario no registrado. Por favor registrese');
      } else {
        if (newUser.activo == 0) {
          return Promise.reject('Usuario bloqueado. Comuniquese con el administrador');
        }
      }
    })
    }),
  ],
  register : [
    check('userName').isLength({min:1}).withMessage('El nombre debe estar completo.') ,
    check('email').isEmail().withMessage('El mail debe ser válido.') ,
    check('password').isLength({min:4}).withMessage('La contraseña debe tener al menos 4 carácteres.') ,
    body("confirmPassword","password").custom(function (value, {req}){
      if (req.body.password == value){
        return true;
      }else{ return false}
    }).withMessage("Las contraseñas no coinciden"),
  //Validacion de Registro de Usuario:
    body('email').custom(value => {
      return db.Usuarios.findOne({
        where: {
          email: value
        }
      }).then((newUser) => {
        if (newUser) {
          return Promise.reject('Usuario ya registrado. Por favor inicie su sesión');
      }})  
    })
  ],
  newpass: [
    check('email').isEmail().withMessage('El mail debe ser válido y debe estar completo.') ,
    check('password').isLength({min:4}).withMessage('La contraseña debe tener al menos 4 carácteres.') ,
    body("confirmPassword","password").custom(function (value, {req}){
      if (req.body.password == value){
        return true;
      }else{ return false}
    }).withMessage("Las contraseñas no coinciden"),
  //Validacion de mail:
    body('email').custom(value => {
      return db.Usuarios.findOne({
        where: {
          email: value
        }
      }).then((newUser) => {
        if (!newUser) {
          return Promise.reject('Usuario no registrado. Por favor registrese');
      } else {
        if (newUser.activo == 0) {
          return Promise.reject('Usuario bloqueado. Comuniquese con el administrador');
        }
      }
    })
    })],
  adminAccess: (req, res, next) => {
    let user = req.session.userLogueado;
    if(user == undefined) {
      res.render('users/login', {errors: [{msg: 'ACCESO DENEGADO. Debe estar logueado y poseer permisos de administración'}]});
    } else {
      if(user.admin == 0) {
        res.render('deniedAcces', {message: 'ACCESO DENEGADO. No posee permisos de administración para acceder.'})
    }
  }
    next()
  },
  edit: (req, res, next) => {
    let user = req.session.userLogueado;
    console.log(user);
    if (user.admin == 0) {
      if (user.id != req.params.id) {
        res.render('deniedAcces', {message: 'ACCESO DENEGADO. No es posible acceder a la ruta solicitada.'})
      } 
    }
    next()
  },
  guest: (req, res, next) => {
    if (req.session.userLogueado) {
       return res.redirect('/');
    }
    next();
  }
};

module.exports = usersMiddleware;