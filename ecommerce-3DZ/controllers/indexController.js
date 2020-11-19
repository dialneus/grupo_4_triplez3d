const indexController = {
  homePage: function(req, res, next) {
    let user = req.session.userLogueado;
    res.render('index', { title: 'Bienvenidos a 3DZ impresiones', user});
  },
  formulario: function(req, res, next) {
    res.render('formularioProductos', { title: 'Formulario de productos' });
  },
  modelado: function (req,res,next){
    res.render('modelado',{title: 'Formulario de Servicio de modelado'})
  },
  check: (req, res, next) => {
    let userInSession = req.session.userLogueado.id;
    res.render('session', {userInSession:userInSession});
  }
};

module.exports = indexController;