//Module Declaration

var express = require('express');
var path = require('path');
var bodyParser =require('body-parser');
var methodOverride = require('method-override');
var mongo = require('mongodb');
var monk = require('monk');

//Database and Express application instantiation

var db = monk('loclhost:27017/emp_data');
var app = express();

//set up view engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','jade');
//Route setup
var index = require('./routes/index');
var emp = require('./routes/emp');

// load middleware and server static files 
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
// Make our db accessible to our router
app.use(function(req,res,next){
	req.db = db;
	next();
});
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));
app.use('/',index);
app.use('/emp',emp);
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});
