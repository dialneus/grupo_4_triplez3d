const usersController = {
  logIn: function(req, res, next) {
    res.render('users/login', { title: 'Ingresá a tu cuenta de 3DZ impresiones' });
  },
  register: function(req, res, next) {
    res.render('users/register', { title: 'Registrate en 3DZ impresiones' });
  },
};

module.exports = usersController;