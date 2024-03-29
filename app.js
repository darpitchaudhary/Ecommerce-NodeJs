var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session=require('express-session');
const noCache = require('nocache');

var indexRouter = require('./routes/index');
var booksRouter = require('./routes/books');

var app = express();
const TWO_HOURS=1000*60*60*2;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  name:'sid',
  cookie: { maxAge: TWO_HOURS,
            sameSite:true,
            secure: false },
  secret: 'keyboard cat',
  resave: false, // change this and check and $rolling parameter
  saveUninitialized: false, //change this to check
}))

app.use(noCache());
app.use('/', indexRouter);
app.use('/books', booksRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   res.send("Please use a valid request");
// });

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
