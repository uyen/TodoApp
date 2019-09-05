// todoController.js

var bodyParser = require("body-parser");
var urlencoded = bodyParser.urlencoded({extended :false}) ;

let datas = ['make a cake' , 'clean the house' , 'watering the garden'  ];

//	connect to db 
var connectionStr = 'this is your connection string ... ';
var db = require('mongoose');
db.connect(connectionStr,  { useNewUrlParser: true });

//	create table/schema in mongoDB 
var tasksSchema = new db.Schema({taskname : String});
var tasks = db.model('tasks', tasksSchema );

module.exports = (app) => {
	console.log('this is controller');

	//	get list
	app.get('/' , (req, res)=> { 

		console.log('GET');

		//	load tasks from db
		tasks.find({} , (err, datas) => {
			if(err) throw err;
			res.render('index', {datas : datas });	
		});
		
	});


	//	add new task into DB
	app.post('/todo' , urlencoded , (req, res)=> {
		
		console.log('POST');
		
		var taskname = req.body.item;

		if( taskname || taskname.length >0 ){
			tasks({taskname : taskname }).save(function(err) {
				if(err) throw err;
				console.log("task saved!");

				//	load tasks from db
				tasks.find({} , (err, datas) => {
					if(err) throw err;
					res.render('tasklist', {datas : datas });	
				});
			});			
		}

		

	});

	//	delete task
	app.delete('/todo/:item' , urlencoded , (req, res)=> {
		
		var taskId = req.params.item;

		if( taskId || taskId.length >0 ){
			tasks.find({_id : taskId}).remove((err)=>{
				if(err) throw err;
				console.log('DELETED ' + taskId );  

				//	load tasks from db
				tasks.find({} , (err, datas) => {
					if(err) throw err;
					res.render('tasklist', {datas : datas });	
				});
			}); 
		}
	});

}