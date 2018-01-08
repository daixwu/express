var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var app = express();

var hbs = exphbs.create({
    partialsDir: 'views/partials',
    layoutsDir: "views/layouts/",
    defaultLayout: 'main',
    extname: '.hbs'
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));


var fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple.",
];


app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res){
    res.render('home');
});
app.get('/about', function(req, res){
    var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', {fortune: randomFortune});
});

// 定制404页面
app.use(function(req, res){
    res.status(404);
    res.render('404');
});
// 定制 500 页面
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});
app.listen(app.get('port'), function(){
    console.log( 'Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.' );
});