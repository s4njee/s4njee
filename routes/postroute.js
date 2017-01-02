var express = require('express');
var router = express.Router();
var fs = require('fs');
var file = "blog.db";
var exists = fs.existsSync(file);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(file);
router.get('/',function(req,res){
 console.log("testing");
   res.render('success');
});
router.post('/',function(req,res){
    var text = req.body.posttext;
    var d = new Date();
    var date = (d.getMonth()+1)+'\/' +(d.getDate())+"\/"+(d.getFullYear());
    var time = d.toTimeString(); 
    db.serialize(function(){
        if(!exists){
            db.run("CREATE TABLE posts (post text, date text, time text)");
        }
        var stmt = db.prepare('INSERT INTO posts VALUES(?,?,?)');
        stmt.run(text,date,time);
        stmt.finalize();
    });
    res.render('success', {post:text, d:date, t:time});
});
router.post('/:id',function(req,res){
    var text = req.body.posttext;
    var d = new Date();
    var date = (d.getMonth()+1)+'\/' +(d.getDate())+"\/"+(d.getFullYear());
    var time = d.toTimeString(); 
    if(req.body.action == 'post'){

        db.serialize(function(){
            if(!exists){
                db.run("CREATE TABLE posts (post text, date text, time text)");
            }
            var stmt = db.prepare('UPDATE posts SET post = (?), date = (?), time = (?) WHERE rowid = (?)');
            stmt.run(text,date,time,req.params.id);
            stmt.finalize();
        });
       res.render('success', {post:text, d:date, t:time});
}   

else if(req.body.action == 'delete'){

        db.serialize(function(){
            if(!exists){
                db.run("CREATE TABLE posts (post text, date text, time text)");
            }
            console.log(req.params.id);
            var stmt = db.prepare('DELETE FROM posts WHERE rowid = ' + req.params.id);
            stmt.run();
            stmt.finalize();
        });
       res.render('success', {post:text, d:date, t:time});
}   
});
module.exports = router;
