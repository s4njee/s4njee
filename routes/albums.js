var express = require('express');
var router = express.Router();
var fs = require('fs');
var ua = require('universal-analytics');
var visitor = ua('UA-89623333-1')
/* GET users listing. */
router.get('/', function(req, res, next) {
  visitor.pageview("/albums").send()
  dirs = fs.readdirSync('./public/albums')
  res.render('albums', {d:dirs})
});
router.get('/:dir',function(req,res){
    visitor.pageview("/albums/"+req.params.dir).send()
    files = fs.readdir('./public/albums/'+req.params.dir,function(err,files){
        if(err){
            res.render('error',{error:err});
        }
     res.render('photoalbum',{d: req.params.dir, files: files})
    })
})

module.exports = router;
