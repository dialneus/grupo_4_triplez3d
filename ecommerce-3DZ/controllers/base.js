//Requiero los modelos de Bases de Datos:
const db = require('../database/models'); 

db.Usuarios.findall()
  .then(usuarios => {
    console.log(usuarios);;
  })



/*
let usuarioIngresado;
let value = 'dialneus@gmail.com';
let usuario;
db.Usuarios.findOne({
  where: {
    email: value
  }
}).then((user) => {
  usuarioIngresado = user;
  });
//  return usuarioIngresado;

//return usuario;
console.log(usuarioIngresado);  
*/