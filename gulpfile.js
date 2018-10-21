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
var combineMediaQueries = require('gulp-combine-mq');
var imagemin = require('gulp-imagemin');
var styleInject = require("gulp-style-inject");
var staticFolder = "./themes/jhonny-roger/static";

gulp.task('css', function(){
	return gulp.src(`${staticFolder}/css/style.sass`)
	.pipe(sass().on('error', sass.logError))
	.pipe(combineMediaQueries())
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

gulp.task('images', function () {
	gulp.src(`${staticFolder}/img/*`)
		.pipe(imagemin([
			imagemin.gifsicle({interlaced: true, optimizationLevel: 3, colors: 32}),
			imagemin.jpegtran({progressive: true}),
			imagemin.optipng({optimizationLevel: 6}),
			imagemin.svgo({
				plugins: [
					{removeViewBox: true},
					{cleanupIDs: false}
				]
			})
		]))
		.pipe(gulp.dest(`${staticFolder}/img/`))
});


gulp.task('rev-assets',  ['css', 'js', 'images'], function () {
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
	.pipe(styleInject())
	.pipe(htmlmin({
		collapseWhitespace: true,
		minifyCSS: true,
		minifyJS: true,
		removeComments: true,
		useShortDoctype: true,
	}).on('error', gutil.log))
	.pipe(gulp.dest('./public'))
});
