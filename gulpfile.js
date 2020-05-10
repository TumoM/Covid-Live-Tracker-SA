var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var autoprefixer = require('autoprefixer');
let uglify = require('gulp-uglify-es').default;
var sourcemaps = require('gulp-sourcemaps')
const pfm = require('postcss-font-magician');
var postcss = require('gulp-postcss')
const eslint = require('gulp-eslint')
var purify = require('gulp-purifycss');
var browserSync = require('browser-sync').create();
const combineSelectors = require('postcss-combine-duplicated-selectors');
const combineMedia = require('postcss-combine-media-query');
const cssnano = require('cssnano')
const series =gulp.series, parallel =gulp.parallel, watch =gulp.watch;


let whitelist = [
   'tabulator', 'striped',  'tabulator-tableHolder',  'tabulator-table',  'tabulator-row:nth-child(2n)'
]
gulp.task('clean',()=>{
    return gulp.src(['public/build***REMOVED***/*','assets/css/*.css','assets/css/*.css.map','assets/js/*.js'], {read: false***REMOVED***)
        .pipe(clean());
***REMOVED***)
// Compile SASS --> CSS, the minify CSS
gulp.task('sass', function () {
  return gulp.src(['src/sass/*.scss', 'src/sass***REMOVED***/*.scss'])
      // Compile SASS files
      .pipe(sass({
        outputStyle: 'compressed',
        precision: 2,
        sourceMap: true,
        outfile:'assets/css',
        includePaths: ['./','src/sass/font_awsome'],
        onError: console.error.bind(console, 'Sass error:')
    ***REMOVED***))
      // Auto-prefix css styles for cross browser compatibility
      // Output
      .pipe(sourcemaps.init())
      .pipe(postcss([ autoprefixer() ]))
      
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('assets/css'));
***REMOVED***);

gulp.task('js', function () {
    return gulp.src(['src/js/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('assets/js'))

***REMOVED***);

gulp.task('pack-js', function () {
  return gulp.src(['assets/js/vendor/jquery.min.js',
      'assets/js/vendor/jquery*.js',
      'assets/js/vendor/semantic*.js',
      'assets/js/vendor/moment*.js',
      'assets/js/vendor/numerals*.js',
      'assets/js/vendor/hammer*.js',
      'assets/js/vendor/chart.min.js',
      'assets/js/vendor/chartjs-plugin-zoom.min.js',
      'assets/js/vendor/jquery.jscrollpane.min.js',
      'assets/js/vendor/tabulator*.js',
      'assets/js/vendor/*.js', 'assets/js***REMOVED***/*.js'])
      .pipe(concat('bundle.js'))
      .pipe(uglify())
      .pipe(gulp.dest('public/build/js'));
***REMOVED***);

gulp.task('pack-css', function () {
  return gulp.src(['assets/css/vendor/semantic*.css','assets/css/vendor/tabulator_semantic-ui*.css','assets/css/vendor/*.css','assets/css***REMOVED***/*.css','assets/css/*.css'])
      .pipe(sourcemaps.init())
      .pipe(concat('stylesheet.css'))
    .pipe(purify([
        'src/js/*.js',
        'assets***REMOVED***/*.js',
        'views***REMOVED***/*.ejs',
        'views***REMOVED***/*.html',
        'public/build***REMOVED***/*.js',
        'helpers***REMOVED***/*.js'],
        { info: true,rejected:false, whitelist***REMOVED***))
      .pipe(postcss([
        pfm(),
        autoprefixer(),
        combineMedia(),
        combineSelectors({removeDuplicatedProperties: true***REMOVED***),
        cssnano({
          preset: ['advanced', {
            discardComments: {
              removeAll: true,
***REMOVED*****REMOVED*****REMOVED***
        ***REMOVED***]
      ***REMOVED***),
  ***REMOVED***))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('public/build/css'))
      .pipe(browserSync.stream());
***REMOVED***);

gulp.task('reload', function (done) {
    console.log("Reloading Browser")
    browserSync.reload();
    done();
***REMOVED***);


gulp.task('watch', ()=>{
    console.log("Watching SASS")
    watch('src/sass***REMOVED***/*.scss',{ ignoreInitial: true ***REMOVED***, series("sass","pack-css"));
    // Or a composed task
    console.log("Watching JS")
    watch(['src/js/*.js',"views***REMOVED***/*.ejs"],{ ignoreInitial: true ***REMOVED***, series("js","pack-js"));
    console.log("Watching EJS")
    // watch("views***REMOVED***/*.ejs", series("pack"));
***REMOVED***)

gulp.task('browserSync', function(cd) {
    browserSync.init({
        files:['public/build***REMOVED***/*.js','public/build***REMOVED***/*.css'],
        proxy: "localhost:5000",
        ui: {
            port: 5001 //Or whatever port you want for browsersync ui
 ***REMOVED*****REMOVED***
  ***REMOVED***)
    cd();
***REMOVED***)

// The lint task
gulp.task('lint', function() {
  return gulp
    // Define the source files
    .src(['src/js/*.js'])
    .pipe(eslint({***REMOVED***))
    // Output the results in the console
    .pipe(eslint.format());
***REMOVED***);
// The lint task
gulp.task('lintF', function() {
  return gulp
    // Define the source files
    .src(['src/js/*.js'])
    .pipe(eslint({fix:true***REMOVED***))
    // Output the results in the console
    .pipe(eslint.format());
***REMOVED***);

gulp.task('pack', series('pack-js', 'pack-css'));
gulp.task('default', series('clean',parallel(['sass', 'js']),'pack','watch'));
gulp.task('build', series('clean',parallel(['sass', 'js']),'pack'));

// The `clean` function is not exported so it can be considered a private task.
// It can still be used within the `series()` composition.
function clean(cb) {
    // body omitted
    cb();
***REMOVED***

// The `build` function is exported so it is public and can be run with the `gulp` command.
// It can also be used within the `series()` composition.
function build(cb) {
    // body omitted
    cb();
***REMOVED***

if (process.env.NODE_ENV === 'development') {
    exports.default = "default";
***REMOVED*** else {
    exports.default = "default";
***REMOVED***
