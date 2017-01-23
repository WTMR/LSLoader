var express = require('express');
var app = express();

var fs= require("fs");

app.use(express.static('build'));


app.get('/', function (req, res) {
    res.sendfile("build/html/index.html");
});

//指定模板引擎
app.set("view engine", 'ejs');
//指定模板位置
app.set('views', __dirname + '/dev/webpack2/html');

//利用模板文件home.ejs渲染为html
app.get("/webpack", function(req, res) {
    res.render('index.ejs', {
        name: 'devil'
    });
});
app.get("/webpack/**", function(req, res) {
    res.render(req.path.replace(/\/webpack\//g,'')+'.ejs', {
        name: 'devil'
    });
});

app.get('/combo', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var combos = req.param('combo').split(';');
    combos=combos || req.param('combo');
    var result = '';
    for(var i in combos){
        result+=fs.readFileSync("build/"+combos[i],"utf-8");
    }
    res.send(result)
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});