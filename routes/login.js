var express = require('express');
const path = require('path');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./my_database.db')


function my_get(req,res,next)
{
    res.sendFile(path.join(__dirname,'../views/login.html'));
}

function alreadyexists(err)
{
    console.log("already exists"+err);
}


function my_post(req,res,next)
{
    var body=req.body;
    var username=body.username;
    var password=body.password;
    console.log(username,password);
    function display(err,result)
    {
        if(err)
        {
            console.log("some error"+err);
        }
        if(result==null)
        {
            console.log("result is null.");
            res.redirect("/login");
        }
        else
        {
            console.log(result);
            if(result[0]!=null && result[0].password=="default")
            res.redirect("/dashboard");
            else
            {
                console.log("username not found");
                res.redirect("/login");
            }
        }
        
    }

    db.all('SELECT * FROM person WHERE pid=?',username, display);
    
}


router.get('/', my_get);
router.post("/",my_post);

module.exports = router;
