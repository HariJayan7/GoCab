var express = require('express');
const path = require('path');
var router = express.Router();

function my_get(req,res,next)
{
    res.sendFile(path.join(__dirname,'../views/signup.html'));
}

function my_post(req,res,next)
{
    var body=req.body;
    console.log(body);
    var name=body.name;
    var rollno=body.rollno;
    var email=body.email;
    var phno=body.phno;
    var age=body.age;
    var gender=body.gender;

    //sql query here
    res.redirect("/login");
}


router.get('/', my_get);
router.post("/",my_post);

module.exports = router;
