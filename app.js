var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyparser = require('body-parser');
const fileUpload = require('express-fileupload');

let methodOverride = require("method-override");
const flash = require('connect-flash');
const session = require('express-session');
const mongoStore = require('connect-mongo');
const passport = require('passport');

// for enviroment variable
require('dotenv').config();
// datbase connection
require('./database/mongoose');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.use(session({
  secret: 'fadkghdjgadgadjkhga',
  resave: true,
  saveUninitialized: true,
  store: mongoStore.create({
    mongoUrl: process.env.MONGO_CONNECTION
  })
}))

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// to use flash
app.use(flash());

// for override ( must be in head of routers file)
app.use(methodOverride("_method"));

// for file upload
app.use(fileUpload());

app.use(async (req, res, next) => {
  res.locals['error_msg'] = req.flash('error_msg');
  res.locals['inputData'] = req.flash('inputData')[0];
  // res.locals['error_arr'] = req.flash('error_arr');
  // res.locals['success_msg'] = req.flash('success_msg');

  res.locals['errors'] = req.flash('errors');
  res.locals['success_msg'] = req.flash('success_msg');

  if (req.user) {

    res.locals['loggedInUser'] = req.user;

  }

  next();

});
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
