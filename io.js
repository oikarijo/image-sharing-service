var io = require('socket.io')();
var comment = require('./modules/comment');

io.on('connection', function(socket){
	socket.on('comment added', function(msg){
		comment.saveComment(msg);
		io.emit('refresh comments', msg['comment']);
	});

});

module.exports = io;