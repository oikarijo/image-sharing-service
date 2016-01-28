var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

router.post('/', function(req, res){
	console.log(req.body.comment);
	console.log(req.body.id);

	var filename = req.body.id.slice(0, -4);
	console.log(filename);

	var file = path.join(__dirname, '../data/' + filename + '.txt');
	console.log(file);
	fs.appendFile(file, req.body.comment + '\n', (err) => {
		if(err) throw err;
		console.log('data appended');
	});

	res.redirect('/' + req.body.id);
});

module.exports = router;