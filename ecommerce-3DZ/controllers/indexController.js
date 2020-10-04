const indexController = {
  homePage: function(req, res, next) {
    res.render('index', { title: 'Bienvenidos a 3DZ impresiones' });
  },
  carrito: function(req, res, next) {
    res.render('products/carrito', { title: 'Carrito de Compras 3DZ' });
  },
  formulario: function(req, res, next) {
    res.render('formularioProductos', { title: 'Formulario de productos' });
  },
  modelado: function (req,res,next){
    res.render('modelado',{title: 'Formulario de Servicio de modelado'})
  }
};

module.exports = indexController;