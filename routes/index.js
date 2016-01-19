var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

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
	console.log("HELLOOOO");

	fs.readdir(getPath(), function(err, files){
		if(err){
			console.log(err);
			res.redirect('back');
		}
		else{
			if(files.indexOf(id) != -1){
				fs.readFile(getPath(id), 'utf8', (err, data) => {
					if(err){
						console.log(err);
						next();
					}
					else{
						req.comments = JSON.parse(data);
						next();
					}
				});
			}
			else{
				res.redirect('/');
			}
		}
	});
});

router.get('/images/:id', renderHome);


function renderHome(req, res){
	fs.readdir(getPath(), function(err, files){
		if(err){
			console.log(err);
			res.redirect('back');
		}
		else{
			if(req.comments){
				var comments = req.comments;
				res.render('modal', { title: 'Imgupload', files: files, comments: comments });
			}
			else{
				res.render('modal', { title: 'Imgupload', files: files });	
			} 
		}
	});
}

function getPath(id){
	if(id){
		return path.join(__dirname, '../data/' + id.split('.').slice(0,1) + '.json');
	}
	else
		return path.join(__dirname, '../public/uploads/');
}

function renderView(viewName, viewData){
	
}

module.exports = router;
