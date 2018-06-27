const express = require('express');
const mysql = require('mysql');

var app = express();

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));


var connection = mysql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	password: '',
	database: 'inventorydb'
});

connection.connect(function(error){
	if(!!error){
		console.log("An error has occurred \n"+error);
	}else{
		console.log("Connection successful");
	}
});

let data = [];
app.get('/', function(req, res){
	
	connection.query("SELECT * FROM orders ORDER BY ORDERTIME DESC", function(error, rows, fields){
		console.log(rows);
		res.render('index', {data: rows});
	});
	
});

app.listen(3000, function(){
	console.log("Server is running on port 3000");
})