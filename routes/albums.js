var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  dirs = fs.readdirSync('./public/albums')
  res.render('albums', {d:dirs})
});
router.get('/:dir',function(req,res){
    files = fs.readdir('./public/albums/'+req.params.dir,function(err,files){
        if(err){
            res.render('error',{error:err});
        }
     res.render('photoalbum',{d: req.params.dir, files: files})
    })
})

module.exports = router;
