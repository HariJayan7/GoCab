require("dotenv").config();
var express = require("express");
const path = require("path");
var router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./my_database.db");

require("dotenv").config();
const jwt = require("jsonwebtoken");

function my_get(req, res, next) {
  res.sendFile(path.join(__dirname, "../views/login.html"));
}
function my_post(req, res, next) {
  var body = req.body;
  var username = body.username;
  var password = body.password;
  function check_credentials(err, result) {
    if (err) {
      console.log("GOT AN ERROR WHILE LOGGING IN " + err);
    } else {
      if (result[0] != null && result[0].password == password) {
        console.log("Username and password matched for user " + username);
        const user = { name: username };
        console.log(user["name"]);
        //send user to db
        const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
        res.cookie("token", token);
        res.redirect("/dashboard");
      } else {
        console.log("Username not found");
        res.redirect("/login");
      }
    }
  }

  db.all("SELECT * FROM person WHERE pid=?", username, check_credentials);
}

router.get("/", my_get);
router.post("/", my_post);

module.exports = router;
