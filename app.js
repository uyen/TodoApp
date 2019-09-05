// app.js

//	init my app
var express = require("express");
var todoController = require('./controllers/todoController');
var app = express();
const portNum = 4444;

//	set view engine
app.set('view engine' , 'ejs');

//	set controller
todoController(app);

//	set static files
app.use(express.static('./public'));

//	listen to port#
app.listen(portNum) ;

console.log('app is running ... ');

