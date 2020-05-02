var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
// var autoprefixer = require('gulp-autoprefixer');
var autoprefixer = require('autoprefixer');
// var uglify = require('gulp-uglify');
let uglify = require('gulp-uglify-es').default;
let rename = require("gulp-rename");
var cleanCss = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps')
const pfm = require('postcss-font-magician');
var postcss = require('gulp-postcss')
var pipeline = require('readable-stream').pipeline;
let babel = require('gulp-babel');

// Set the browser that you want to support
const AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];


// Compile SASS --> CSS, the minify CSS
gulp.task('sass', function () {
  /*return gulp.src(['src/sass/!*.scss', 'src/sass/!**!/!*.scss'])
      .pipe(sass({outputStyle: 'compressed'***REMOVED***))
      .pipe(gulp.dest('assets/css'));*/
  return gulp.src(['src/sass/*.scss', 'src/sass***REMOVED***/*.scss'])
      // Compile SASS files
      .pipe(sass({
        outputStyle: 'nested',
        precision: 10,
        includePaths: ['.'],
        onError: console.error.bind(console, 'Sass error:')
    ***REMOVED***))
      // Auto-prefix css styles for cross browser compatibility
      // Output
      .pipe(postcss([ autoprefixer() ]))
      .pipe(cleanCss())
      .pipe(gulp.dest('assets/css'));
***REMOVED***);

gulp.task('scripts', function () {
    return gulp.src(['src/js/vendor/*.js', 'src/js/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('assets/js'))

***REMOVED***);

gulp.task('pack-js', function () {
  return gulp.src(['assets/js/vendor/jquery.min.js','assets/js/vendor/jquery*.js','assets/js/vendor/*.js', 'assets/js/*.js'])
      .pipe(concat('bundle.js'))
      .pipe(uglify())
      .pipe(gulp.dest('public/build/js'));
***REMOVED***);

gulp.task('pack-css', function () {
  return gulp.src(['assets/css/vendor/*.css','assets/css***REMOVED***/*.css','assets/css/*.css'])
      .pipe(sourcemaps.init())
      .pipe(postcss([pfm()]))
      .pipe(concat('stylesheet.css'))
      .pipe(cleanCss())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('public/build/css'));
***REMOVED***);

gulp.task('default', gulp.series['sass','pack']);
gulp.task('pack', gulp.parallel(['pack-js', 'pack-css']));