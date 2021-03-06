require('dotenv').config(); // .env file

var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var mongoose     = require('mongoose');

/*----------------------------------------
| Routes
|----------------------------------------*/
var routes = require('./routes/index');
var users  = require('./routes/users');
var auth   = require('./routes/auth');


var app = express();
var db = mongoose.connect('mongodb://127.0.0.1/'+process.env.DB_HOST);

require('./models/userModel')(mongoose);


/*----------------------------------------
| View engine setup
|----------------------------------------*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

/*----------------------------------------
| Middlewares
|----------------------------------------*/
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// extra middlewares
// require('./config/middlewares')(app);

// passport
require('./config/passport')(app);

app.use('/', routes);
app.use('/users', users);
app.use('/auth', auth);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
