const express = require('express');

var app = express();

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

app.get('/', function(req, res){
	res.render('index');
});

app.listen(3000, function(){
	console.log("Server is running on port 3000");
})