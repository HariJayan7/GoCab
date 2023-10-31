var express = require('express');
const path = require('path');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./my_database.db')
function my_get(req,res,next)
{
    res.sendFile(path.join(__dirname,'../views/login.html'));
}
function my_post(req,res,next)
{
    var body=req.body;
    var username=body.username;
    var password=body.password;
    function check_credentials(err,result)
    {
        if(err)
        {
            console.log("GOT AN ERROR WHILE LOGGING IN "+err);
        }
        else
        {
            if(result[0]!=null && result[0].password==password)
            res.redirect("/dashboard");
            else
            {
                console.log("Username not found");
                res.redirect("/login");
            }
        }
        
    }

    db.all('SELECT * FROM person WHERE pid=?',username, check_credentials);
    
}


router.get('/', my_get);
router.post("/",my_post);

module.exports = router;
