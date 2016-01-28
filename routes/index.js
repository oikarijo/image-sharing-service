var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

var app = express();

/* GET home page. */
router.get('/', function(req, res){
	fs.readdir(getPath(), function(err, files){
		if(err){
			console.log(err);
		}
		else{
			res.render('index', { title: 'Imgupload', files: files });
		}
	});
});

router.param('id', function(req, res, next, id){
	req.id = id;
	fs.readdir(getPath(), function(err, files){
		if(err){
			console.log(err);
			res.redirect('back');
		}
		else{
			if(files.indexOf(id) != -1){
				var path = getPath(id);
				fs.access(path, fs.F_OK, function(err){
					if(err){
						/* no comments exist for this file */
						next();
					}
					else{
						fs.readFile(path, 'utf8', function(err, data){
							if(err){
								/* Just some error */
								next();
							}
							else{
								req.comments = data.toString().split('\n');
								next();
							}
						});
					}
				});
			}
			else{
				res.redirect('/');
			}
		}
	});
});

router.get('/:id', renderHome);

function renderHome(req, res){
	fs.readdir(getPath(), function(err, files){
		if(err){
			console.log(err);
			res.redirect('back');
		}
		else{
			if(req.comments){
				res.render('modal', { layout: false, files: files, comments: req.comments, id: req.id });
			}
			else{
				res.render('modal', { layout: false, files: files, id: req.id });	
			} 
		}
	});
}

function getPath(id){
	if(id){
		return path.join(__dirname, '../data/' + id.split('.').slice(0,1) + '.txt');
	}
	else
		return path.join(__dirname, '../public/uploads/');
}

module.exports = router;
