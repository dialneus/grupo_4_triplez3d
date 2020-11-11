var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController');
var usersMiddleware = require('../middlewares/usersMiddleware');

//Requiero path y fs para trabajar con archivos:
const path = require('path');
const fs = require('fs');

//Requiero Express-Validator para validar los datos de los formularios:
var{check, validationResult, body} = require('express-validator');

//Requiero los modelos de Bases de Datos:
const db = require('../database/models');

// Rutas a  LogIn:
router.get('/login', usersController.logIn);

router.post('/login', [
  check('email').isEmail().withMessage('El mail debe ser válido y debe estar completo.') ,
  check('password').isLength({min:4}).withMessage('La constraseña debe tener al menos 4 carácteres.') ,
//Validacion de mail:
  body('email').custom(value => {
    return db.Usuarios.findOne({
      where: {
        email: value
      }
    }).then((newUser) => {
      if (!newUser) {
        return Promise.reject('Usuario no registrado. Por favor registrese');
    }})
  }),
] ,usersController.processLogin);

// Rutas a Registro Usuario:
router.get('/register', usersController.register);
router.post('/register', [
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
], usersController.create);

//Ruta a Listado Usuarios:

router.get('/listado',usersController.list);

//Ruta a Detalle de Usuario:

router.get('/:id', usersController.detail);

//Ruta a Actualización de Datos Usuario:

router.get('/edit/:id', usersController.edit);
router.post('/edit/:id', usersController.update);

module.exports = router;
