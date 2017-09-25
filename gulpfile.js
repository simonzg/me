var fs           = require('fs');
var gulp         = require('gulp');
var browserSync  = require('browser-sync').create();
var gutil        = require('gulp-util');
var plumber      = require('gulp-plumber');
var imagemin     = require('gulp-imagemin');

// Sass & minify
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var csso         = require('gulp-csso');
var sourcemaps   = require('gulp-sourcemaps');

// Babel / Browserify / Uglify
var buffer       = require('vinyl-buffer');
var uglify       = require('gulp-uglify');
var rename       = require('gulp-rename');
var source       = require('vinyl-source-stream');
var babelify     = require('babelify');
var watchify     = require('watchify');
var exorcist     = require('exorcist');
var browserify   = require('browserify');

var pug = require('gulp-pug');
var data = require('gulp-data');

gulp.task('pug', function buildHTML() {
  return gulp.src(['src/pug/*.pug'])
  .pipe(plumber())
  .pipe(pug({}))
  .pipe(gulp.dest(''))
});

gulp.task('gen-detail', function generateDetailPages(){
    const folder = 'src/pug/data';

    fs.readdir(folder, (err, files) => {
      files.forEach(file => {
        var basename = file.split('.')[0];
        console.log(basename);
        return gulp.src(['src/pug/template/detail.pug'])
            .pipe(data(function(file) {
              var json = require('./src/pug/data/'+basename+'.json');
              json['order'] = [
                'projects',
                'seagull',
                'mcd',
                'more',
                'artfin',
                'live-in-the-real',
                'iceland',
                'road',
                'summer',
                'projects'
              ]
              return json;
            }))
            .pipe(pug({}))
            .pipe(rename(basename+'.html'))
            .pipe(gulp.dest(''));
    });
  })

})
// autoprefixer options
var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

// Watchify args contains necessary cache options to achieve fast incremental bundles.
// See watchify readme for details. Adding debug true for source-map generation.
watchify.args.debug = true;
// Input file.
var bundler = watchify(browserify('src/babel/app.js', watchify.args));

// Babel transform
bundler.transform("babelify", {presets: ["es2015"]});

// On updates recompile
bundler.on('update', bundle);

function bundle() {

    gutil.log('Compiling JS...');

    return bundler.bundle()
        .on('error', function (err) {
            gutil.log(err.message);
            browserSync.notify("Browserify Error!");
            this.emit("end");
        })
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(gulp.dest('dist/js/'))
        .pipe(rename({suffix:'.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'))
        .pipe(browserSync.stream({once: true}))
        .on('end', function(){ gutil.log(gutil.colors.green("Successful JS Bundle."))});
}

// Compile babel into browserified
gulp.task('babel', function () {
    return bundle();
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(['src/scss/*.scss'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest("dist/css/"))
        .pipe(rename({suffix: '.min'}))
        .pipe(csso())
        .pipe(gulp.dest("dist/css/"))
        .pipe(browserSync.stream())
        .on('end', function(){ gutil.log(gutil.colors.green("Successful CSS Generation."))});
});


// Minify PNG / JPEG ...
gulp.task('imagemin', function(){
    return gulp.src(['src/image/*.png', 'src/image/*.jpg', 'src/image/*.jpeg'])
        .pipe(plumber())
        .pipe(imagemin())
        .pipe(gulp.dest('dist/image/'));
});

// Static Server + watching scss/html files
gulp.task('serve', ['pug', 'gen-detail', 'babel', 'sass'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch(['src/scss/*.scss'], ['sass']);
    gulp.watch(['src/pug/**/*.pug'], ['pug','gen-detail']);
    gulp.watch(['src/pug/data/*.json'], ['gen-detail']);
    gulp.watch(['src/image/**/*'], ['img']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('default', ['serve']);

var imageResize = require('gulp-image-resize');

gulp.task('img', function () {
    var dest = 'dist/image/'
    // move everything other than .jpg to destination
    gulp.src(['src/image/**/*', '!src/image/**/*.jpg'])
    .pipe(gulp.dest(dest))

    // resize every jpg except main to width 1100
    gulp.src(['src/image/**/*.jpg', '!src/image/**/main-*.jpg', '!src/image/**/bg-*.jpg'])
    .pipe(imageResize({
      width : 1100,
      crop : false,
      upscale : false,
      imageMagick: true
      }))
    .pipe(gulp.dest(dest));

    // resize every main image to width 1600
    return gulp.src(['src/image/**/main-*.jpg', 'src/image/**/bg-*.jpg'])
    .pipe(imageResize({
        width:1600,
        crop: false,
        upscale: false,
        imageMagick: true
    }))
    .pipe(gulp.dest(dest));
});
