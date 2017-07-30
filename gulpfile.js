var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var debug = require('gulp-debug');
var htmlmin = require('gulp-htmlmin')
var gutil = require('gulp-util');
var del = require('del');
var sass = require('gulp-sass');
var rev = require('gulp-rev')
var revReplace = require('gulp-rev-replace')

var staticFolder = "./themes/jhonny-roger/static";

console.log(`${staticFolder}/js/*.js`)
gulp.task('css', function(){
	return gulp.src(`${staticFolder}/css/style.sass`)
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer())
	.pipe(minifyCSS())
	.pipe(rename('style.min.css'))
	.pipe(gulp.dest(`${staticFolder}/css`))
})


gulp.task('js', function () {
	return gulp.src([`!${staticFolder}/js/main.min.js`, `${staticFolder}/js/*.js`])
	.pipe(uglify())
	.pipe(concat('main.min.js'))
	.pipe(gulp.dest(`${staticFolder}/js`))
});


gulp.task('rev-assets',  ['css', 'js'], function () {
	return gulp.src([`${staticFolder}/js/*.js`, `${staticFolder}/css/*.css`])
	.pipe(gulp.dest(`${staticFolder}/dist`))
	.pipe(rev())
	.pipe(gulp.dest(`${staticFolder}/dist`)) 
	.pipe(rev.manifest())
	.pipe(gulp.dest(`${staticFolder}/dist/manifest`))
});


gulp.task("replace-assets", function() {
	var manifest = gulp.src(`${staticFolder}/dist/manifest/rev-manifest.json`);

	return gulp.src('public/**/*.html')
	.pipe(revReplace({manifest: manifest}))
	.pipe(gulp.dest('./public'));
});


gulp.task('html', ["replace-assets"], function () {
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
