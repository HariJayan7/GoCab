var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


// add mapping here and....                 ///////////////////////////////////////
var homeRouter = require("./routes/home");
var loginRouter = require("./routes/login");
var signupRouter = require("./routes/signup");
var dashboardRouter=require("./routes/dashboard");
var searchRouter= require("./routes/search");
// var searchresultRouter=require("./routes/searchresult");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//add here tooo
app.use('/', homeRouter);                   /////////////////////////////////////
app.use("/index",homeRouter);
app.use("/home",homeRouter);
app.use("/login",loginRouter);
app.use("/signup",signupRouter);
app.use("/dashboard",dashboardRouter);
app.use("/search",searchRouter);


//this is for catching css
app.use(express.static(__dirname + '/public'));

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
  res.sendFile(path.join(__dirname,'views/error.html'));
});

module.exports = app;
