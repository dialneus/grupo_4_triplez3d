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
      
      for (let i = 0; i < productos.length; i++) {
        productos[i].setDataValue('endpoint', '/api/products/' + productos[i].id)
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