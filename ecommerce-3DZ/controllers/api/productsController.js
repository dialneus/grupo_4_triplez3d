//Requiero path y fs para trabajar con archivos:
const path = require('path');
const fs = require('fs');

//Requiero los modelos de Bases de Datos:
const db = require('../../database/models'); 

const productsController = {
  list: (req, res, next) => {
    let url = req.url;
    db.Producto.findAll()
    .then((productos) => {
      let user = req.session.userLogueado;
      
      for (producto of productos) {
        producto.setDataValue('endpoint', '/api/products/' + producto.id)
      }
      let productsResponse = {
        meta : {
          status: 200,
          total: productos.length,
          url: '/api/products'
        },
        data : productos
      }
      res.json(productsResponse);
    }).catch((err) => { console.log(err) });
  }
};

module.exports = productsController;