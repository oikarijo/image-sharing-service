var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	cssmin = require('gulp-cssmin');

var jsDir = 'vendor/js/';
var cssDir = 'vendor/css/';

gulp.task('minifyjs', function(){
	return gulp.src(['jquery.js', 'bootstrap.js', 'socket.io.js', 'scripts.js'], { cwd: jsDir })
			.pipe(concat('app.min.js'))
			.pipe(uglify())
			.pipe(gulp.dest('public/js'));
});

gulp.task('minifycss', function(){
	return gulp.src(['bootstrap.css', 'style.css'], { cwd: cssDir })
			.pipe(cssmin())
			.pipe(concat('app.min.css'))
			.pipe(gulp.dest('public/css'));
});

gulp.task('default', ['minifyjs', 'minifycss'], function(){});