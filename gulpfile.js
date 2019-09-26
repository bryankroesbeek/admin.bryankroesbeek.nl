var gulp = require('gulp');
var gsass = require('gulp-sass');
var concat = require('gulp-concat');
var cleanCss = require('gulp-clean-css');

var cssPath = 'Client/stylesheets/**/*.css';
var sassPath = 'Client/stylesheets/**/*.scss';

function sass() {
    return gulp.src(sassPath)
        .pipe(gsass())
        .pipe(cleanCss())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('app/assets/stylesheets/'))
};

function watch() {
    gulp.watch([cssPath, sassPath], sass);
};

exports.sass = sass;
exports.watch = watch;
exports.default = sass;