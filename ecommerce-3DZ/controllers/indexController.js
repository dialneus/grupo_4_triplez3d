const indexController = {
  homePage: function(req, res, next) {
    let user = req.session.userLogueado;
    res.render('index', { title: 'Bienvenidos a 3DZ impresiones', user});
  },
  formulario: function(req, res, next) {
    res.render('formularioProductos', { title: 'Formulario de productos' });
  },
  modelado: function (req,res,next){
    let user = req.session.userLogueado;
    res.render('modelado',{title: 'Formulario de Servicio de modelado', user})
  },
  /*check: (req, res, next) => {
    let userInSession = req.session.userLogueado.id;
    res.render('session', {userInSession:userInSession});
  },*/
    nosotros: function (req,res,next){
    let user = req.session.userLogueado;
    res.render('nosotros',{title: 'nosotros', user})
  },
  contacto: function (req,res,next){
    let user = req.session.userLogueado;
    res.render('contacto',{title: 'contacto', user})
  }
}


module.exports = indexController;