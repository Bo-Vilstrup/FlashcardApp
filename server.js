'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var passport = require('passport');
var helmet = require('helmet');


var authenticate = require("./app/routes/authenticate.server.route");
var dailyExercises = require('./app/routes/dailyExercises.server.route');
var user = require('./app/routes/user.server.route.js');
var card = require('./app/routes/card.server.route');
var routes = require('./app/routes/index');

var app = express();
app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


app.use(function (req, res, next) {
  if (req.headers['x-forwarded-proto'] == 'http') {
    res.redirect('https://' + req.headers.host + req.path);
  } else {
    return next();
  }
});

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


var passport = require("passport");
var passportConfig = require("./config/strategy/passport");
passportConfig(passport);


app.use('/api/*', function(req, res, next) {
    passport.authenticate('jwt', {session: false}, function(err, user, info) {
        if (err) { res.status(403).json({mesage:"Token could not be authenticated",fullError: err}) }
        if (user) {
            req.userName = user.userName;
            return next();
        }
        return res.status(403).json({mesage: "Token could not be authenticated", fullError: info});
    })(req, res, next);
});


app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', authenticate);
app.use('/api', dailyExercises);
app.use('/api', user);
app.use('/api', card);
app.use('/', routes);





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
