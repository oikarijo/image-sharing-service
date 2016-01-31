var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var io = require('../io');

io.on('connection', function(socket){
	socket.on('comment added', function(msg){
		saveComment(msg);
		io.emit('refresh comments', msg['comment']);
	});
});

function saveComment(msg){
	var filename = msg['id'].slice(0, -4);

	var file = path.join(__dirname, '../data/' + filename + '.txt');

	fs.appendFile(file, msg['comment'] + '\n', (err) => {
		if(err) throw err;
	});
}

module.exports = router;