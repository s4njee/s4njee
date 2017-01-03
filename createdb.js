var fs = require('fs');
var file = "blog.db";
var exists = fs.existsSync(file);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(file);
db.serialize(function(){
    if(!exists)
        db.run("CREATE TABLE posts(post TEXT, date TEXT, time TEXT)")
});
