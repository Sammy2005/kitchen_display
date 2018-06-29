data = {
	message: "Order deleted successfully"
}
const mysql = require('mysql');
var bodyParser = require('body-parser');

var urlEncodedParser = bodyParser.urlencoded({extended: false});

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'inventorydb'
});

connection.connect(function(error){
	if(!!error){
		console.error(error);
	}else{
		console.log('Connection successful in controller');
	}
})
module.exports = function(app, dataRes){

	app.post('/clear', urlEncodedParser, function(req, res){
		let clearData = req.body;
		var sql = 'INSERT INTO order_tmp (ORDERID, QTY, DETAILS, ORDERTIME, UPDATETIME) VALUES('+mysql.escape(clearData.ORDERID)+','+clearData.QTY+','+mysql.escape(clearData.DETAILS)+','+mysql.escape(clearData.ORDERTIME)+','+mysql.escape(Date())+')';
		
		connection.query(sql, function(err, result){
			if(err) throw err;

			console.log("Record inserted successfully");

			connection.query('DELETE FROM orders WHERE ID = '+clearData.ID, function(error, result){
			if(error) throw error;

			console.log(result.affectedRows+' record deleted successfully');
			});
		});

		res.json(data.message);
	});

	app.post('/recall', urlEncodedParser, function(req, res){
		let recallData = req.body;
		recallData.TICKETID = "RECALL";
		//console.log(recallData);
	var sql = 'INSERT INTO orders (ORDERID, QTY, DETAILS, ORDERTIME, TICKETID) VALUES('+mysql.escape(recallData.ORDERID)+','+recallData.QTY+','+mysql.escape(recallData.DETAILS)+', '+new Date(recallData.ORDERTIME).getTime()+' , "RECALL")';
	console.log(sql);
	connection.query(sql, function(err, result){
		if(err) throw err;

		console.log("Order recalled successfully");

		var sql = "DELETE * FROM order_tmp WHERE ID = "+recallData.ID;

	connection.query(sql, function(err, rows, fields){
		if(err) throw err;

		console.log("Recall deleted successfully");

		res.json(data);
	});

	});
	
});
}

