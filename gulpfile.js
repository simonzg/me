var gulp         = require('gulp');
var browserSync  = require('browser-sync').create();
var sass         = require('gulp-sass');
var plumber      = require('gulp-plumber');
var imagemin     = require('gulp-imagemin');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps   = require('gulp-sourcemaps');
// autoprefixer options
var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(['src/scss/*.scss'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest("dist/css/"))
        .pipe(browserSync.stream());
});

// Move the javascript files into our /js folder
gulp.task('js', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/tether/dist/js/tether.min.js'])
        .pipe(plumber())
        .pipe(gulp.dest("dist/js/"))
        .pipe(browserSync.stream());
});

// Minify PNG / JPEG ...
gulp.task('imagemin', function(){
    return gulp.src(['src/image/*.png', 'src/image/*.jpg', 'src/image/*.jpeg'])
        .pipe(plumber())
        .pipe(imagemin())
        .pipe(gulp.dest('dist/image/'));
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch(['src/scss/*.scss'], ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('default', ['js','serve']);
