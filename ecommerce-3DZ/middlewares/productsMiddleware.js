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
      check("name").isLength({min:1}).withMessage("El nombre debe estar completo"),
      check("price").isLength({min:1}).withMessage("El precio debe estar completo")    
  ],
  validation : [
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
  ],
  createProduct: [
    body("name")
      .notEmpty()
      .withMessage("Campo obligatorio")
      .bail()
      .isLength({ min: 30 })
      .withMessage("La descripción debe tener al menos 30 carácteres"),
    body("price")
      .notEmpty()
      .withMessage("Campo obligatorio")
      .bail()
      .isNumeric()
      .withMessage("Solo se aceptan números")
      .bail()
      .custom((value, { req }) => req.body.price > 0)
      .withMessage("No se aceptan números negativos"),
    body("image")
      .custom((value, { req }) => req.file)
      .withMessage("Debes ingresar una imagen para tu producto")
      .bail()
      .custom((value, { req }) => {
        const acceptedExtensions = [".jpg", ".jpeg", ".png"];
        const ext = path.extname(req.file.originalname);
        return acceptedExtensions.includes(ext);
      })
      .withMessage(
        "La imagen debe tener uno de los siguientes formatos: JPG, JPEG, PNG"
      ),
  ],
}

module.exports = productsMiddleware;