var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var cleanCss = require('gulp-clean-css');

var cssPath = 'Client/stylesheets/**/*.css';
var sassPath = 'Client/stylesheets/**/*.scss';

gulp.task('css', () => {
    return gulp.src(cssPath)
        .pipe(cleanCss())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('app/assets/stylesheets/'))
});

gulp.task('sass', () => {
    return gulp.src(sassPath)
        .pipe(sass())
        .pipe(cleanCss())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('app/assets/stylesheets/'))
});

gulp.task('watch', () => {
    gulp.watch([cssPath, sassPath], ['css', 'sass']);
});

gulp.task('default', ['css', 'sass']);