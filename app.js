var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var hbs = require('hbs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//helpers hbs
hbs.registerHelper('date', function (){
	return new Date();
});

//mongoose connect
mongoose.connect('mongodb://127.0.0.1/library');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Everything is okay, mongodb is connected');
});

var person = mongoose.Schema({
	name: {
		firstname : String,
		lastname  : String
	}
});

person.virtual('name.fullName').get(function(){
	return this.name.firstname.concat(' ').concat(this.name.lastname);
});

var Person = mongoose.model('Person', person);

Person.create({
	name: {
		firstname: 'Felipe',
		lastname : 'Tavares'
	}
}, function(err, person){
   if (err) {
   	   console.log('Error person => ', err);
   	   return;
   }

   console.log('Person Data => ', person);
   console.log('Person FullName => ', person.name.fullName);
});


var company = mongoose.Schema({
	name   : {
		type: String,
		required: true
	},	
	address:{
		name  : String,
		number: Number,
		city  : String
	},
	date: {
		type   : Date,
		required: true,
		default: Date.now
	}  
});

var Company = mongoose.model('Company', company)

Company.create({
	name : 'Company 1',
	address: {
		name  : 'Addres 1',
		number: 765,
		city  : 'São Paulo'
	},
	date: new Date()
}, function (err, company){
	if (err) {
		console.log('Error => ', err);
		return;
	}

	console.log('Created -> ', company);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
