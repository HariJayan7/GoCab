var express = require('express');
const path = require('path');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./my_database.db')


function my_get(req,res,next)
{
    res.sendFile(path.join(__dirname,'../views/signup.html'));
}

function alreadyexists(err)
{   
    if(err)
    console.log("already exists"+err);
}


function my_post(req,res,next)
{
    var body=req.body;
    var name=body.name;
    var rollno=body.rollno;
    var password=body.password;
    var email=body.email;
    var phno=body.phno;
    var age=body.age;
    var gender=body.gender;
    const stmt = db.prepare('INSERT INTO person VALUES (?,?,?,?,?,?,?)');
    stmt.run(rollno,password,name,email,phno,age,gender,alreadyexists);
    stmt.finalize();

    function display(err,result)
    {
        if(err)
        {
            console.log("some error"+err);
        }
        console.log(result);
    }
    db.all('SELECT * FROM person', display);
    res.redirect("/login");
}


router.get('/', my_get);
router.post("/",my_post);

module.exports = router;
