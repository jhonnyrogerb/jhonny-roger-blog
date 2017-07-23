var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var debug = require('gulp-debug');
var order = require('gulp-order');
var htmlmin = require('gulp-htmlmin')
var gutil = require('gulp-util');
var childProcess = require('child_process');
var del = require('del');
const shell = require('gulp-shell')
var sass = require('gulp-sass');
var rename = require('gulp-rename')

gulp.task('clean', function(){
	del(['public']).then(paths => {
		gulp.run('build')
	})
})

gulp.task('build', ['hugo'], function () {
	gulp.run(['html', 'css', 'js', 'search-index'])
})


gulp.task('hugo', shell.task('hugo', {'ignoreErrors': true}))


gulp.task('html', function () {
	return gulp.src('public/**/*.html')
	.pipe(htmlmin({
		collapseWhitespace: true,
		minifyCSS: true,
		minifyJS: true,
		removeComments: true,
		useShortDoctype: true,
	}).on('error', gutil.log))
	.pipe(gulp.dest('./public'))
});

gulp.task('css', function(){
  return gulp.src('public/css/style.sass')
    .pipe(sass().on('error', sass.logError))
	.pipe(minifyCSS())
	.pipe(autoprefixer('last 2 version', 'safari 5', 'ie6', 'ie7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
	.pipe(rename('style.min.css'))
	.pipe(gulp.dest('public/css/'))
})


gulp.task('js', function () {
	return gulp.src(['!public/js/main.min.js', 'public/js/*.js'])
	.pipe(uglify())
	.pipe(concat('main.min.js'))
	.pipe(gulp.dest('public/js'))
});

gulp.task('search-index', shell.task('node lunr-script.js'))