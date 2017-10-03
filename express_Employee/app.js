//dependencies set up 
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var path = require('path');
//database set up
var mongo = require('mongodb');
var monk = require('monk');
var routes = require('./routes/index');
var users = require('./routes/user');

//initialization of app 
const app = express();
var db = monk('localhost:27017/mean');

// setup View Engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);
app.set("view options", { layout: "main.html" });
// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));
app.use(express.static(path.join(__dirname,'public'))); 

app.use(function(req,res,next){
    req.db = db;
    next();
});

// set variables 
app.set('port', process.env.port || 3000);

app.use('/',routes);
app.use('/users',users);

//Error handleing   
app.use(function(req,res,next){
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// listen to port 
app.listen(app.get('port'),function(){
    console.log('Express is running on http://localhost/'+app.get('port'));
});