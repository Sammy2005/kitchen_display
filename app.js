const express = require('express');
const mysql = require('mysql');
var dbController = require('./controller/dbController');

var app = express();


app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));
var dataRes = {};
dbController(app, dataRes);
connection = mysql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	password: 'root',
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
		if(error) throw error;

		var sql = "SELECT * FROM order_tmp ORDER BY ID DESC";

		connection.query(sql, function(err, rowsRe, fieldsRe){
		if(err) throw err;
		res.render('index', {data: rows, dataRes: rowsRe});
	});

	});

});

app.listen(3000, function(){
	console.log("Server is running on port 3000");
})
