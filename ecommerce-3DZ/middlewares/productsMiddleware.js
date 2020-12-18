//Requiero path y fs para trabajar con archivos:
const path = require('path');
const fs = require('fs');

//Requiero bcrypt para encriptar las contraseñas:
const bcrypt = require('bcrypt');

//Requiero Express-Validator para validar los datos de los formularios:
var{check, validationResult, body} = require('express-validator');

//Requiero los modelos de Bases de Datos:
const db = require('../database/models');

const productsMiddleware = {
  validar : [
    body('name')
      .notEmpty()
      .withMessage("Nombre: Campo obligatorio")
      .isAlpha()
      .withMessage('Nombre: No se admiten números')
      .isLength({min:5})
      .withMessage("Nombre: Debe indicar al menos una descripción de 5 letras"),
    body('price')
      .notEmpty()
      .withMessage("Precio: Campo obligatorio")
      .isNumeric()
      .withMessage("Precio: Solo se aceptan números")
      .custom((value, { req }) => req.body.price > 0)
      .withMessage("No se aceptan números negativos"),
  ]
}

module.exports = productsMiddleware;