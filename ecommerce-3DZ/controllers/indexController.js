const indexController = {
  homePage: function(req, res, next) {
    res.render('index', { title: 'Bienvenidos a 3DZ impresiones' });
  },
  formulario: function(req, res, next) {
    res.render('formularioProductos', { title: 'Formulario de productos' });
  },
  modelado: function (req,res,next){
    res.render('modelado',{title: 'Formulario de Servicio de modelado'})
  },
  nosotros: function (req,res,next){
    res.render('nosotros',{title: 'nosotros'})
  },
  contacto: function (req,res,next){
    res.render('contacto',{title: 'contacto'})
  }
}


module.exports = indexController;