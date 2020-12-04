var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

//Routers:
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');

//Middlewares:
var rememberMiddleware = require('./middlewares/rememberMiddleware');
//var logMiddleware = require('./middlewares/logMiddleware');

//Api's:
var apiUsersRouter = require('./routes/api/users');
var apiProductsRouter = require('./routes/api/products');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'eCommerce3DZ'}));

//Rutas Generales:
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

//Middlewares:
app.use(rememberMiddleware);
//app.use(logMiddleware);

//Rutas a Api's:
app.use('/api/users', apiUsersRouter);
app.use('/api/products', apiProductsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
