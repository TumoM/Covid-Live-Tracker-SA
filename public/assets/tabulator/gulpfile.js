var gulp = require('gulp'),
sass = require('gulp-sass'),
autoprefixer = require('gulp-autoprefixer'),
cssnano = require('gulp-cssnano'),
jshint = require('gulp-jshint'),
uglify = require('gulp-uglify'),
imagemin = require('gulp-imagemin'),
rename = require('gulp-rename'),
concat = require('gulp-concat'),
notify = require('gulp-notify'),
cache = require('gulp-cache'),
livereload = require('gulp-livereload'),
del = require('del');
include = require('gulp-include'),
sourcemaps = require('gulp-sourcemaps'),
babel = require('gulp-babel'),
plumber = require('gulp-plumber'),
gutil = require('gulp-util'),
insert = require('gulp-insert'),
fs = require('fs');

var version_no = "4.6.2",

version = "/* Tabulator v" + version_no + " (c) Oliver Folkerd***REMOVED***/\n";

var gulp_src = gulp.src;
gulp.src = function() {
    return gulp_src.apply(gulp, arguments)
    .pipe(plumber(function(error) {
        // Output an error message
        gutil.log(gutil.colors.red('Error (' + error.plugin + '): ' + error.message));
        // emit the end event, to properly end the task
        this.emit('end');
      ***REMOVED***)
    );
***REMOVED***;

//build css
gulp.task('styles', function() {
    return gulp.src('src/scss***REMOVED***/tabulator*.scss')
    .pipe(sourcemaps.init())
    .pipe(insert.prepend(version + "\n"))
    .pipe(sass({outputStyle: 'expanded'***REMOVED***).on('error', sass.logError))
    .pipe(autoprefixer('last 4 version'))
    .pipe(gulp.dest('dist/css'))
    .pipe(rename({suffix: '.min'***REMOVED***))
    .pipe(cssnano({zindex: false***REMOVED***))
    .pipe(insert.prepend(version))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'))
    .on('end', function(){ gutil.log('Styles task complete'); ***REMOVED***)
  ***REMOVED***);


//build tabulator
gulp.task('tabulator', function() {
    //return gulp.src('src/js***REMOVED***/*.js')
    return gulp.src('src/js/core_modules.js')
    .pipe(insert.prepend(version + "\n"))
    //.pipe(sourcemaps.init())
    .pipe(include())
    //.pipe(jshint())
    // .pipe(jshint.reporter('default'))
    .pipe(babel({
        //presets:['es2015']
        compact: false,
        presets: [["env",{
            "targets": {
              "browsers": ["last 4 versions"]
***REMOVED*****REMOVED*****REMOVED***
            loose: true,
            modules: false,
 ***REMOVED*****REMOVED*** ], {***REMOVED***]
    ***REMOVED***))
    .pipe(concat('tabulator.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(rename({suffix: '.min'***REMOVED***))
    .pipe(uglify())
    .pipe(insert.prepend(version))
    // .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js'))
    //.pipe(notify({ message: 'Scripts task complete' ***REMOVED***));
    .on('end', function(){ gutil.log('Tabulator Complete'); ***REMOVED***)
    //.on("error", console.log)
  ***REMOVED***);


//simplified core js
gulp.task('core', function() {
    return gulp.src('src/js/core.js')
    .pipe(insert.prepend(version + "\n"))
    .pipe(include())
    .pipe(babel({
        presets: [["env", {
          "targets": {
            "browsers": ["last 4 versions"]
 ***REMOVED*****REMOVED***
        loose: true,
        modules: false,
      ***REMOVED***]
    ***REMOVED***
      ***REMOVED***))
    .pipe(concat('tabulator_core.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(rename({suffix: '.min'***REMOVED***))
    .pipe(uglify())
    .pipe(insert.prepend(version))
    .pipe(gulp.dest('dist/js'))
    .on('end', function(){ gutil.log('Core complete'); ***REMOVED***)
  ***REMOVED***);



//make jquery wrapper
gulp.task('modules', function(){

    var path = __dirname + "/src/js/modules/";

    var files = fs.readdirSync(path);

    var core = ["layout.js", "localize.js", "comms.js"];

    files.forEach(function(file, index){

        if(!core.includes(file)){
            return gulp.src('src/js/modules/' + file)
            .pipe(insert.prepend(version + "\n"))
            .pipe(include())
            .pipe(babel({
                presets: [["env", {
                  "targets": {
                    "browsers": ["last 4 versions"]
    ***REMOVED*****REMOVED*****REMOVED***
                loose: true,
                modules: false,
              ***REMOVED***]
            ***REMOVED***
              ***REMOVED***))
            .pipe(concat(file))
            .pipe(gulp.dest('dist/js/modules/'))
            .pipe(rename({suffix: '.min'***REMOVED***))
            .pipe(uglify())
            .pipe(insert.prepend(version))
            .pipe(gulp.dest('dist/js/modules/'))
      ***REMOVED***
      ***REMOVED***);

  ***REMOVED***);

//make jquery wrapper
gulp.task('jquery', function(){
    return gulp.src('src/js/jquery_wrapper.js')
    .pipe(insert.prepend(version + "\n"))
    .pipe(include())
    .pipe(babel({
        presets: [["env", {
          "targets": {
            "browsers": ["last 4 versions"]
 ***REMOVED*****REMOVED***
        loose: true,
        modules: false,
      ***REMOVED***]
    ***REMOVED***
      ***REMOVED***))
    .pipe(concat('jquery_wrapper.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(rename({suffix: '.min'***REMOVED***))
    .pipe(uglify())
    .pipe(insert.prepend(version))
    .pipe(gulp.dest('dist/js'))
    .on('end', function(){ gutil.log('jQuery wrapper complete'); ***REMOVED***)

  ***REMOVED***);


gulp.task('scripts', function(cb) {
    return gulp.series('tabulator');
    
***REMOVED***);

gulp.task('clean', function() {
    return del(['dist/css', 'dist/js']);
  ***REMOVED***);

gulp.task('default', gulp.series('clean',gulp.parallel(['styles', 'tabulator'])) );


gulp.task('watch', function() {

    // Watch .scss files
    gulp.watch('src/scss***REMOVED***/*.scss', ['styles']);

    // Watch .js files
    gulp.watch('src/js***REMOVED***/*.js', ['scripts']);

  ***REMOVED***);
