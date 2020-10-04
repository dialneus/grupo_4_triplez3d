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
};

module.exports = indexController;