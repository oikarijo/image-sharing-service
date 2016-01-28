var express = require('express');
var router = express.Router();
var path = require('path');
var multer = require('multer');
var bodyParser = require('body-parser');

router.post('/', function(req, res){
	upload(req, res, function(err){
		if(!req.file){
			console.log("foo");
		}
		else{
			console.log(req.file);
		}
	});
	res.redirect('/');
});

var fileFilter = function(req, file, cb){
	if(file.mimetype.match("image/*")){
		cb(null, true);
	}
	else cb(null, false);
}

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
})

var upload = multer({ storage: storage, fileFilter }).single('image');

module.exports = router;
