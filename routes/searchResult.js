var express = require('express');
const path = require('path');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./my_database.db')

function my_get(req,res,next)
{
    res.sendFile(path.join(__dirname,'../views/searchResult.html'));
}
function addlisting(bid,pid)
{
    const stmt=db.prepare("INSERT INTO listings SELECT ?,? WHERE NOT EXISTS (SELECT * FROM listings WHERE bid=? AND pid=?)");
    stmt.run(bid,pid,bid,pid);
    stmt.finalize();
}
function alreadyexists(err)
{
    console.log("already exists error in searchResult page error "+err);
}
function display_all_booking()
{
    function display(err,result)
    {
        if(err)
        {
            console.log("some error"+err);
        }
        console.log("Booking Table:\n");
        console.log(result);
    }
    db.all('SELECT * FROM booking', display);
}
function display_all_listings()
{
    function display(err,result)
    {
        if(err)
        {
            console.log("some error"+err);
        }
        console.log("Listing Table:\n");
        console.log(result);
    }
    db.all('SELECT * FROM listings', display);
}
function book_trip(req,res,next)
{
    var body=req.body;
    var bid=body['booking_id'];
    function my_process(err,result)
    {
        if(err)
        {
            console.log("error in Booking a trip: "+err);
        }
        else
        {
            if(result[0]==null)
            console.log("No more Space in this booking");
            else
            {
                var pid="B200825CS"; // need to change here
                function bookit(err,result)
                {
                    if(result[0]==null)
                    {
                        var cur_num=result[0]['cur_num'];
                        const stmt = db.prepare('UPDATE booking SET cur_num = ? WHERE bid=?');
                        stmt.run(cur_num+1,bid);
                        stmt.finalize();
                        addlisting(bid,pid);
                        display_all_booking();
                        display_all_listings();
                    }
                    else
                    {
                        console.log("Already this listing exists\n");
                    }
                }
                db.all("SELECT * FROM listings WHERE listings.pid=? AND listings.bid=?",pid,bid,bookit);
                
            }
        }
    }
    db.all('SELECT * FROM booking WHERE booking.bid=? AND cur_num<max_num',bid,my_process);
    res.redirect("/dashboard");
    
    
}
function my_post(req,res,next)
{
    book_trip(req,res,next);
}

router.get('/', my_get);
router.post('/',my_post);

module.exports = router;
