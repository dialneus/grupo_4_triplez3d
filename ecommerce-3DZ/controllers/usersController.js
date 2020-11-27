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
const CarritoProducto = require('../database/models/CarritoProducto');


const usersController = {
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
          console.log('En login el id del usuario en session es: ' + req.session.userLogueado.id);
          if(req.body.recordame != undefined) {
            res.cookie('recordame', userFind.email, {maxAge: 8.64e+7});
        }
          res.redirect('/');
        }    
      });
      
      } else {
        return res.render('users/login', {errors: errors.errors})
      };
  },
  newPass: (req, res, next) => {
    res.render('users/newPass');
  },
  updateNewPass: (req,res) => {
    //Capturo los errores del formulario y analizo su existencia:
    let errors = (validationResult(req));
    console.log(errors);
    // Continuo con las validaciones:
    if(errors.isEmpty()) {
    //Capturo los datos que vienen del formulario:
    let user = {
      user_email: req.body.email,
      user_password: bcrypt.hashSync(req.body.password, 10),
    }
    //Escribo la base de datos con el nuevo usuario:
    db.Usuarios.update({
      password: user.user_password 
    }, {
      where: {
        email: req.body.email
      }
    });
    res.render('users/login');
  }
},

  list: (req, res, next) => {
    db.Usuarios.findAll()
    .then((usuarios) => {
      let user = req.session.userLogueado;
      res.render('users/usersList', {usuarios: usuarios, user})
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
      user_admin: Number(req.body.userType),
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
  destroy: (req, res, next) => {
    //Grabo los datos en la base de Datos:
    db.Usuarios.update({
      activo: 0,
    }, {
      where: {
        id: req.params.id
      }
    });
    res.redirect('/users/listado')
  },
  activate: (req, res, next) => {
    //Grabo los datos en la base de Datos:
    db.Usuarios.update({
      activo: 1,
    }, {
      where: {
        id: req.params.id
      }
    });
    res.redirect('/users/listado')
  },
  permission: (req, res, next) => {
    //Grabo los datos en la base de Datos:
    db.Usuarios.update({
      admin: req.body.userType,
    }, {
      where: {
        id: req.params.id
      }
    });
    res.redirect('/users/listado')
  },
  checkout: (req,res,next) => {
    req.session.destroy((err) => {
      res.redirect('/')
    });
  },  
  carrito: function(req, res, next) {
    db.CarritoProducto.findAll({
      where : {
        usuarioId : req.session.userLogueado.id,
        estado : 1
      },
      include : [{association: "producto"}]
    })
    .then((respuesta) => {
      let user = req.session.userLogueado;
      let Total = 0;
      respuesta.forEach(element => {
        Total += element.subTotal; 
      });
      res.render('users/carrito', { title: 'Carrito de Compras 3DZ', respuesta, Total, user});
      //res.json({respuesta});
    }).catch((e) => {console.log(e)});
  },
  addToCart: function(req,res,next){
    db.Producto.findByPk(req.body.producto_id)
    .then((producto) =>{
      db.CarritoProducto.create({
        productoId : producto.id,
        usuarioId : req.session.userLogueado.id,
        precio : producto.precio,
        cantidad : req.body.cantidad,
        estado : 1,
        subTotal : producto.precio*req.body.cantidad
      })
      .then(() => res.redirect('/chart'))
      .catch((e) => {console.log(e)});
    }).catch((e) => {console.log(e)});
  },
  deleteFromChart: function(req,res,next){
    db.CarritoProducto.destroy({
      where: {
        id: req.body.elemento_id,
      },
      force: true,
    })
      .then(() => res.redirect("/chart"))
      .catch((e) => console.log(e));
  },
  purchase: function(req,res,next){
    let productos;
    let carrito;
    let user = req.session.userLogueado;
    //busco los productos que el usuario tiene abiertos
    db.CarritoProducto.findAll({
      where : {
        usuarioId: req.session.userLogueado.id,
        estado: 1
      }
    })
    //cierro la compra (estado =0)
    .then((productosEncontrados)=>{
      productos = productosEncontrados;
        return db.CarritoProducto.closeProductState(req.session.userLogueado.id);
    })
    //registro la compra (tabla carritos de la BD)
    .then(()=>{
      return db.Carrito.create({
        orderNumber : Math.round(100000000*(Math.random())),
        total : productos.reduce(
          (total, producto) => (total = total + producto.subTotal),
          0
        ),
        usuario_id: req.body.userID
      });
    })
    //busco la ultima compra para tomar sus datos
    .then(() => {
      return db.Carrito.findOne({
        order: [["id", "DESC"]],
      })
    })
    //asigno el ID de la ultima compra a los productos que se cerraron
    .then((nuevoCarrito)=>{
      carrito = nuevoCarrito;
      return db.CarritoProducto.asignChartId(req.session.userLogueado.id,nuevoCarrito.id);
    })
    .then(()=>{
      res.render('users/detalleCompra', {user, carrito});
    })
    .catch((e) => console.log(e));
  },
  buyHistory : function(req,res,next){
    db.Carrito.findAll({
      where : {
        usuario_id : req.session.userLogueado.id
      },
      include : {
        all : true,
        nested : true
      },
      order : [["createdAt","DESC"]]
    })
    .then((compras)=>{
      let detalleCompras = compras;
      let user = req.session.userLogueado;
      res.render('users/buyHistory',{detalleCompras, user});
    }).catch((e) => console.log(e));
  }

};

module.exports = usersController;