var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var fortune = require('./lib/fortune.js');
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
app.use(require('body-parser')());

app.set('port', process.env.PORT || 3000);

app.use(function(req, res, next){
    res.locals.showTests = app.get('env') !== 'production' &&
        req.query.test === '1';
    next();
});

app.use(require('cookie-parser')(credentials.cookieSecret));
app.use(require('express-session')());


app.get('/', function(req, res){
    res.render('home');
});
app.get('/about', function(req, res){
    res.render('about', {
        fortune: fortune.getFortune(),
        pageTestScript: '/qa/tests-about.js'
    });
});

app.get('/tours/hood-river', function(req, res){
    res.render('tours/hood-river');
});
app.get('/tours/request-group-rate', function(req, res){
    res.render('tours/request-group-rate');
});

app.get('/newsletter', function(req, res){
// 我们会在后面学到 CSRF......目前，只提供一个虚拟值
    res.render('newsletter', { csrf: 'CSRF token goes here' });
});

app.post('/process', function(req, res){
    console.log('Form (from querystring): ' + req.query.form);
    console.log('CSRF token (from hidden form field): ' + req.body._csrf);
    console.log('Name (from visible form field): ' + req.body.name);
    console.log('Email (from visible form field): ' + req.body.email);
    res.redirect(303, '/thank-you');
});

if( app.thing == null ) console.log( 'bleat!' );
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