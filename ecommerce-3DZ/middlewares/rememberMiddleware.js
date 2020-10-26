//Requiero path y fs para trabajar con archivos:
const path = require('path');
const fs = require('fs');

//Defino una variable con la ruta y archivo donde se almacenaran los usuarios:
const usersDataBase = path.join(__dirname,'..','data','usersDataBase.json');

//Leo la base de datos de users:
let usersDB = fs.readFileSync(usersDataBase,{encoding: 'utf-8'});

function rememberMiddleware(req, res, next) {
  next();
  if(req.cookies.recordame != undefined && req.session.userFind == undefined) {
    //Valido el contenido de la base de datos de usuarios:
    if(usersDB == '') {
      users = [];
    } else {
      users = JSON.parse(usersDB);
    }
    let userFind;
    for(var i = 0; i <users.length; i++) {
      if(users[i].user_email == req.cookies.recordame) {
          userFind = users[i];
          break;
        }  
      }
    req.session.userLogueado = userFind;
    }
};

module.exports = rememberMiddleware;