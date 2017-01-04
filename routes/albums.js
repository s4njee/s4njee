var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  dirs = fs.readdirSync('./public/albums')
  res.render('albums', {d:dirs})
});
router.get('/:dir',function(req,res){
 files = fs.readdirSync('./public/albums/'+req.params.dir)
 res.render('photoalbum',{d: req.params.dir, files: files})
})

module.exports = router;
