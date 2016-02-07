var path = require('path');
var fs = require('fs');

module.exports = {
	saveComment: function(msg){
		var filename = msg['id'].slice(0, -4);

		var file = path.join(__dirname, '../data/' + filename + '.txt');

		fs.appendFile(file, msg['comment'] + '\n', (err) => {
			if(err) throw err;
		});
	}
};
