var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var debug = require('gulp-debug');
var order = require('gulp-order');


gulp.task('css', function(){
	return gulp.src(['!themes/jhonny-roger/static/css/style.min.css', 'themes/jhonny-roger/static/css/reset.css' ,'themes/jhonny-roger/static/css/*.css'])
	.pipe(debug())
	.pipe(minifyCSS())
	.pipe(autoprefixer('last 2 version', 'safari 5', 'ie6', 'ie7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
	.pipe(concat('style.min.css'))
	.pipe(gulp.dest('themes/jhonny-roger/static/css/'))
})


gulp.task("watch", ["css"], function () {
	gulp.watch(['!themes/jhonny-roger/static/css/style.min.css', 'themes/jhonny-roger/static/css/*.css'], ["css"])
})