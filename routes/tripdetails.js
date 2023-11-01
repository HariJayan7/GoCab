var express = require("express");
const path = require("path");
var router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./my_database.db");

require("dotenv").config();
const jwt = require("jsonwebtoken");

function update_booking(bid, cur_num) {
  const stmt = db.prepare("UPDATE booking SET cur_num=? WHERE bid=?");
  stmt.run(cur_num - 1, bid);
  stmt.finalize();
  if (cur_num <= 1) remove_booking(bid);
}
function remove_booking(bid) {
  const stmt = db.prepare("DELETE from BOOKING where BID=?");
  stmt.run(bid);
  stmt.finalize();
}
function remove_listing(bid, pid) {
  const stmt = db.prepare("DELETE FROM listings WHERE pid=? AND bid=?");
  stmt.run(pid, bid);
  stmt.finalize();
}
function if_listing_exists_and_proceed(bid, pid, cur_num) {
  function check(err, result) {
    if (err) {
      console.log("Error fetching the listing " + err);
    } else {
      if (result[0] == null) {
        console.log("THIS LISTING DOES NOT EXIST ");
      } else {
        remove_listing(bid, pid);
        update_booking(bid, cur_num);
      }
    }
  }
  db.all(
    "SELECT * FROM listings WHERE listings.pid=? AND listings.bid=?",
    pid,
    bid,
    check
  );
}
function unbook_trip(req, res, next) {
  var body = req.body;
  console.log(body);
  const token = req.cookies.token;
  const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  var pid = user["name"];
  var bid = body["booking_id"];
  db.all("SELECT * FROM booking WHERE booking.bid=?", bid, my_processo);
  function my_processo(err, result) {
    if (err) {
      console.log("Got an error while unbooking a trip" + err);
    } else {
      if (result[0] == null) console.log("THERE IS NO SUCH BOOKING ID");
      else {
        var cur_num = result[0]["cur_num"];
        if_listing_exists_and_proceed(bid, pid, cur_num);
        // remove_listing(bid,pid);
        // update_booking(bid,cur_num);
      }
    }
    res.redirect("/dashboard");
  }
}
function my_post(req, res, next) {
  unbook_trip(req, res, next);
}

function my_get(req, res, next) {
  res.sendFile(path.join(__dirname, "../views/tripDetails.html"));
}
function my_get_json(req, res, next) {
  var bid = req.query.bid;
  db.all(
    "SELECT * FROM (booking INNER JOIN listings ON booking.bid=listings.bid) INNER JOIN person ON person.pid=listings.pid WHERE booking.bid=?",
    bid,
    sendjson
  );
  function sendjson(err, result) {
    if (err) console.log("FAILED TO RETRIVE TRIP DETAILS " + err);
    else {
      console.log(result);
      res.send(result);
    }
  }
}
router.get("/", my_get);
router.post("/", my_post);
router.get("/get_json", my_get_json);
module.exports = router;
