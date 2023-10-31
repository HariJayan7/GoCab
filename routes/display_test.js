var express = require("express");
const path = require("path");
var router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./my_database.db");

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
function display_all_people() {
  function display(err, result) {
    if (err) {
      console.log("Error while displaying people" + err);
    }
    console.log(result);
  }
  db.all("SELECT * FROM person", display);
}
