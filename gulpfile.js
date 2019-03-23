const gulp = require('gulp')
const less = require('gulp-less')
const concat = require('gulp-concat')
const browserSync = require('browser-sync').create()
const cleanCSS = require('gulp-clean-css')
const rename = require('gulp-rename')

var paths = {
    styles: {
      src: './styles/*.less',
      dest: './assets/css'
    },
    scripts: {
      src: 'src/js/*.js',
      dest: 'assets/js'
    },
  };
  

  function style() {
    return gulp
        .src(paths.styles.src, {
        sourcemaps: true
      })
      .pipe(less())
      .pipe(rename({
        basename: 'main',
        suffix: '.min'
      }))
  .pipe(cleanCSS({debug: true}))
  .pipe(concat('main.min.css'))
  .pipe(gulp.dest(paths.styles.dest));
  }


function watch() {
    //  watch for changed
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('./styles/*.less', style)
    gulp.watch('./*.html').on('change', browserSync.reload)
    gulp.watch('./*.js').on('change', browserSync.reload)
}

exports.style = style;
exports.watch = watch;