// require("dotenv").config();
// const express = require("express");
// const app = express();
// const jwt = require("jsonwebtoken");

// app.use(express.json());

// app.post("/loginverify", async (req, res) => {
//   const user = { name: req.body.name, password: req.body.password };
//   //send user to db
//     const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
//     res.cookie("token", token);
//     res.json({ accessToken: accessToken });
//     res.redirect("/dashboard");
//     //   res.status(201);
// });

// app.post("/loginverify", async (req, res) => {
//   const user = { name: req.body.username, password: req.body.password };
//   //fetch user info from db using username and check
//   const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
//   res.cookie("token", token);
//   res.json({ accessToken: accessToken });
// });

// app.get("/dashboard", authenticateToken, (req,res,next) => {
//   //redirect
// });

// function authenticateToken(req, res, next) {
//   const token = req.cookies.token;
//   try {
//     const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//     req.user = user;
//     next();
//   } catch (err) {
//     res.clearCookie("token");
//     return res.redirect("/");
//   }
// }