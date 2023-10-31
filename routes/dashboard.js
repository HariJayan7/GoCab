require("dotenv").config();
var express = require("express");
const path = require("path");
var router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./my_database.db");
const jwt = require("jsonwebtoken");

function my_get(req, res, next) {
  res.sendFile(path.join(__dirname, "../views/main.html"));
}

function my_get_json_dashboard(req, res, next) {
  console.log("hello");
  const token = req.cookies.token;
  const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  var pid = user["name"];
  console.log(pid);
  // var pid="b20019cs";
  function get_trips(err, result) {
    console.log(result);
    // res.sendFile(path.join(__dirname,'../views/main.html'));
    res.send(result);
  }
  db.all(
    "SELECT DISTINCT * FROM  booking INNER JOIN listings ON booking.bid=listings.bid WHERE listings.pid=?",
    pid,
    get_trips
  );
}
function alreadyexists(err) {
  console.log("This Booking ID already exists" + err);
}
function display_all_booking() {
  function display(err, result) {
    if (err) {
      console.log("Error while displaying bookings" + err);
    }
    console.log("Booking Table:\n");
    console.log(result);
  }
  db.all("SELECT * FROM booking", display);
}
function display_all_listings() {
  function display(err, result) {
    if (err) {
      console.log("Error while displaying listings" + err);
    }
    console.log("Listing Table:\n");
    console.log(result);
  }
  db.all("SELECT * FROM listings", display);
}

function addlisting(bid, pid) {
  const stmt = db.prepare(
    "INSERT INTO listings SELECT ?,? WHERE NOT EXISTS (SELECT * FROM listings WHERE bid=? AND pid=?)"
  );
  stmt.run(bid, pid, bid, pid);
  stmt.finalize();
}
function add_newtrip(
  bid,
  etd,
  start_dest,
  final_dest,
  cab_type,
  curnum,
  maxnum
) {
  const stmt = db.prepare("INSERT INTO booking VALUES (?,?,?,?,?,?,?)");
  stmt.run(
    bid,
    etd,
    start_dest,
    final_dest,
    cab_type,
    curnum,
    maxnum,
    alreadyexists
  );
  stmt.finalize();
}
function newtrip(req, res, next) {
  var body = req.body;
  var etd = body.appointment;
  var start_dest = body.start;
  var final_dest = body.destination;
  var cab_type = body.cabtype;
  var curnum = 1;
  var maxnum = body.max;
  var bid = -1;
  function my_process(err, result) {
    // var pid="B200825CS";
    console.log("hello");
    const token = req.cookies.token;
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    var pid = user["name"];
    console.log(pid);
    if (err) {
      console.log("Error while getting old booking ID from database " + err);
    } else {
      var p = result[0]["MAX(bid)"];
      console.log(p);
      if (p == null) bid = 1;
      else bid = p + 1;
      console.log("This is the bid now", bid);
      add_newtrip(bid, etd, start_dest, final_dest, cab_type, curnum, maxnum);
      addlisting(bid, pid);
      display_all_booking();
      display_all_listings();
    }
  }
  db.all("SELECT MAX(bid) FROM booking", my_process);
}
function redirect_searchtrip(req, res, next) {
  console.log("hello");
  var body = req.body;
  var mind = body.appointment[0];
  var maxd = body.appointment[1];
  var start_dest = body.start;
  var final_dest = body.destination;
  var query =
    "start=" +
    start_dest +
    "&destination=" +
    final_dest +
    "&st=" +
    mind +
    "&et=" +
    maxd;
  res.redirect("/searchResult?" + query);
}
function my_post(req, res, next) {
  var type = req.body.type;
  console.log(req.body);
  console.log(req.body.type);
  if (type == "1") {
    redirect_searchtrip(req, res, next);
  } else {
    if (type == "2") newtrip(req, res, next);
    else console.log("type error:", type);
    res.redirect("/dashboard");
  }
}

function authenticateToken(req, res, next) {
  console.log("authenticating");
  const token = req.cookies.token;
  //   console.log(token);
  try {
    console.log("token checking");
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = user;
    console.log(req.user["name"]);
    next();
  } catch (err) {
    console.log("token error");
    res.clearCookie("token");
    return res.redirect("/");
  }
}

router.get("/", authenticateToken, my_get);
router.get("/get_json", my_get_json_dashboard);
router.post("/", my_post);

module.exports = router;
