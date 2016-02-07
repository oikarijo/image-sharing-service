var path = require('path');
var multer = require('multer');

var fileFilter = function(req, file, cb){
	if(file.mimetype.match("image/*")){
		cb(null, true);
	}
	else cb(null, false);
};

var storage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, path.join(__dirname, '../public/uploads/'));
	},
	filename: function(req, file, cb){
		var fileName = Math.floor((Math.random() * 99999) + 10000);
		fileName = fileName.toString();
		var fileExt = file.originalname.split('.').pop().toLowerCase();
		cb(null, fileName + '.' + fileExt);
	}
});

module.exports = {
	uploadFile: multer({ storage: storage, fileFilter }).single('image')
};
