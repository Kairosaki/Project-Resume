var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var minifycss = require('gulp-clean-css');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify-es').default;

// compile scss into css
function style() {
  return (
    gulp
      // 1. where is my scss file
      .src('./src/scss/main.scss')
      // 2. pass that file through sass compiler
      .pipe(sass().on('error', sass.logError))
      // 3. where do I save the compiled CSS
      .pipe(gulp.dest('./css'))
      // 4. minify it
      .pipe(minifycss())
      // 5. stream changes to all browser
      .pipe(browserSync.stream())
  );
}

gulp.task('scripts', function() {
  return gulp
    .src([
      /* Add your JS files here, they will be combined in this order */
      'node_modules/jquery/dist/jquery.js',
      'node_modules/bootstrap/js/dist/alert.js',
      'node_modules/bootstrap/js/dist/util.js',
      'node_modules/bootstrap/js/dist/button.js',
      'node_modules/bootstrap/js/dist/carousel.js',
      'node_modules/bootstrap/js/dist/dropdown.js',
      'node_modules/bootstrap/js/dist/collapse.js',
      'node_modules/bootstrap/js/dist/tab.js',
      'node_modules/bootstrap/js/dist/modal.js',
      'node_modules/bootstrap/js/dist/scrollspy.js',
      'src/js/main.js',
      'src/js/other.js'
    ])
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('./js'));
});

function watch() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch('./src/scss/**/*.scss', style);
  gulp.watch('./*.html').on('change', browserSync.reload);
  gulp.watch('./src/js/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;
