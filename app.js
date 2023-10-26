var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


// add mapping here and....                 ///////////////////////////////////////
var indexRouter = require("./routes/index");
var loginRouter = require("./routes/login");
var signupRouter = require("./routes/signup");
var dashboardRouter=require("./routes/dashboard");
var searchRouter= require("./routes/search");
var searchresultRouter=require("./routes/searchResult");

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
app.use('/', indexRouter);                   /////////////////////////////////////
app.use("/index",indexRouter);
app.use("/home",dashboardRouter);
app.use("/login",loginRouter);
app.use("/signup",signupRouter);
app.use("/dashboard",dashboardRouter);
app.use("/search",searchRouter);
app.use("/searchResult",searchresultRouter);


//this is for finding css and js
// app.use(express.static(__dirname + '/public'));

//database integration
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./my_database.db');
function initialize()
{
  function alreadyexists(err)
  {
    console.log("already initialized");
  }
  var createpersontable="CREATE TABLE person (\
    pid varchar NOT NULL,\
    name varchar NOT NULL,\
    email varchar NOT NULL,\
    phone varchar NOT NULL,\
    age int NOT NULL,\
    gender varchar NOT NULL,\
    PRIMARY KEY (pid)\
  );"

  var createbookingtable="CREATE TABLE booking (\
    bid int NOT NULL,\
    etd DATETIME NOT NULL,\
    start_dest varchar NOT NULL,\
    final_dest varchar NOT NULL,\
    cab_type varchar NOT NULL,\
    cur_num int NOT NULL,\
    max_num int NOT NULL,\
    PRIMARY KEY (bid)\
  );"

  var createlistingstable="CREATE TABLE listings (\
    bid int NOT NULL,\
    pid varchar NOT NULL\
    FOREIGN KEY(bid) REFERENCES booking(bid)\
    FOREIGN KEY(pid) REFERENCES person(pid)\
  );"

  createlistingstable="CREATE TABLE `listings` (\
    bid int NOT NULL,\
    pid varchar NOT NULL\
  );"
  
  var constrant1="ALTER TABLE `listings` ADD CONSTRAINT `listings_fk0` FOREIGN KEY (`bid`) REFERENCES `booking`(`bid`);"
  var constrant2="ALTER TABLE `listings` ADD CONSTRAINT `listings_fk1` FOREIGN KEY (`pid`) REFERENCES `person`(`pid`);"

  //running the commands here
  db.run(createpersontable,alreadyexists);
  db.run(createbookingtable,alreadyexists);
  db.run(createlistingstable,alreadyexists);
  // db.run(constrant1);
  // db.run(constrant2);

  const stmt = db.prepare('INSERT INTO person VALUES (?,?,?,?,?,?)');
  stmt.run("0","root","root@gmail.com","000","0","M",alreadyexists);
  stmt.run("1","rooti","rooti@gmail.com","0000","0","F",alreadyexists);
  stmt.finalize();

  function display(err,result)
  {
    console.log(result);
  }
  db.all('SELECT * FROM person', display);
}


db.serialize(initialize);
db.close();


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
