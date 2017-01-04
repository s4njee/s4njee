var express = require('express');
var router = express.Router();
var fs = require('fs');
var file = "blog.db";
var exists = fs.existsSync(file);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(file);
var ua = require('universal-analytics');
var visitor = ua('UA-89623333-1')
/* GET home page. */
router.get('/', function(req, res, next) {
  visitor.pageview("/").send()
    db.serialize(function(){
        db.all("SELECT post,date,time FROM posts ORDER BY rowid DESC LIMIT 5",function(err, row){
        res.render('index', { title: 's4njee',posts:row,current:0});
        });
    });
});
router.get('/otherprojects',function(req,res){
   res.render('otherprojects'); 
});
router.get('/About',function(req,res){
   res.render('about'); 
});
router.get('/wiimodchip',function(req,res){
    fs.readdir('./public/albums/wiimodchip',function(err,files){
    res.render('wiimodchip',{photos:files});
    });
});
router.get('/:id', function(req, res, next) {
  visitor.pageview("/").send()
    db.serialize(function(){
        db.each("SELECT rowid AS id FROM posts ORDER BY rowid DESC LIMIT 1",function(err, row){
            db.all("SELECT post,date,time FROM posts WHERE rowid <= "+(row.id-req.params.id)+" ORDER BY rowid DESC LIMIT 5",function(err, row){
                console.log(row.length)
                if(row.length<5){ 
                res.render('index', { title: 's4njee',posts:row, current:req.params.id, lastpage:true});
                } 
               });
            });
        });
});
module.exports = router;
