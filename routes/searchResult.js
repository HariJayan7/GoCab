var express = require("express");
const path = require("path");
var router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./my_database.db");
require("dotenv").config();
const jwt = require("jsonwebtoken");

function addlisting(bid, pid) {
  const stmt = db.prepare(
    "INSERT INTO listings SELECT ?,? WHERE NOT EXISTS (SELECT * FROM listings WHERE bid=? AND pid=?)"
  );
  stmt.run(bid, pid, bid, pid);
  stmt.finalize();
}
function display_all_booking() {
  function display(err, result) {
    if (err) {
      console.log("Error" + err);
    }
    console.log("Booking Table:\n");
    console.log(result);
  }
  db.all("SELECT * FROM booking", display);
}
function display_all_listings() {
  function display(err, result) {
    if (err) {
      console.log("Error" + err);
    }
    console.log("Listing Table:\n");
    console.log(result);
  }
  db.all("SELECT * FROM listings", display);
}
function book_trip(req, res, next) {
  var body = req.body;
  var bid = body["booking_id"];
  function my_process(err, result) {
    if (err) {
      console.log("Error in booking a trip: " + err);
    } else {
      if (result[0] == null) console.log("No space in this booking");
      else {
        const token = req.cookies.token;
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        var pid = user["name"];
        var cur_num = result[0]["cur_num"];
        function bookit(err, result) {
          if (result[0] == null) {
            const stmt = db.prepare(
              "UPDATE booking SET cur_num = ? WHERE bid=?"
            );
            stmt.run(cur_num + 1, bid);
            stmt.finalize();
            addlisting(bid, pid);
            display_all_booking();
            display_all_listings();
          } else {
            console.log("This already listing exists\n");
          }
        }
        db.all(
          "SELECT * FROM listings WHERE listings.pid=? AND listings.bid=?",
          pid,
          bid,
          bookit
        );
      }
    }
  }
  db.all(
    "SELECT * FROM booking WHERE booking.bid=? AND cur_num<max_num",
    bid,
    my_process
  );
  res.redirect("/dashboard");
}
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
function unbook_trip(req, res, next) {
  var body = req.body;
  //   var pid = "B200014CS"; // need to change here
  const token = req.cookies.token;
  const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  var pid = req.user["name"];
  var bid = body["booking_id"];
  db.all("SELECT * FROM booking WHERE booking.bid=?", bid, my_processo);
  function my_processo(err, result) {
    if (err) {
      console.log("Got an error while unbooking a trip" + err);
    } else {
      if (result[0] == null) console.log("THERE IS NO SUCH BOOKING ID");
      else {
        var cur_num = result[0]["cur_num"];
        remove_listing(bid, pid);
        update_booking(bid);
      }
    }
    res.redirect("/dashboard");
  }
}
function my_post(req, res, next) {
  book_trip(req, res, next);
}
function searchtrip(req, res, next) {
  var mind = req.query.st;
  var maxd = req.query.et;
  var start_dest = req.query.start;
  var final_dest = req.query.destination;
  console.log(mind, maxd, start_dest, final_dest);
  function search_process(err, result) {
    console.log(result);
    res.send(result);
  }
  db.all(
    "SELECT * FROM booking WHERE etd>=? AND etd<=? AND start_dest=? AND final_dest=? AND cur_num<max_num ",
    mind,
    maxd,
    start_dest,
    final_dest,
    search_process
  );
}
function my_get(req, res, next) {
  res.sendFile(path.join(__dirname, "../views/searchResult.html"));
}
router.get("/get_json", searchtrip);
router.get("/", my_get);
router.post("/", my_post);

module.exports = router;
