var sharp = require('sharp')
var fs = require('fs')
var path = require('path')
var recursive = require('recursive-readdir');
var f = {}
recursive('./public/albums2',function(err,files){
    files.forEach(function(entry){
       sharp(entry)
       .resize(700)
       .toFile(entry+'.jpeg',function(err,info){
           console.log(info)
            })
    
    })
})
    

