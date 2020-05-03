var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
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
var browserSync = require('browser-sync').create();
const series =gulp.series, parallel =gulp.parallel, watch =gulp.watch;

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

gulp.task('clean',()=>{
    return gulp.src('public/build/**/*', {read: false})
        .pipe(clean());
})
// Compile SASS --> CSS, the minify CSS
gulp.task('sass', function () {
  /*return gulp.src(['src/sass/!*.scss', 'src/sass/!**!/!*.scss'])
      .pipe(sass({outputStyle: 'compressed'}))
      .pipe(gulp.dest('assets/css'));*/
  return gulp.src(['src/sass/*.scss', 'src/sass/**/*.scss'])
      // Compile SASS files
      .pipe(sass({
        outputStyle: 'nested',
        precision: 10,
        includePaths: ['.'],
        onError: console.error.bind(console, 'Sass error:')
      }))
      // Auto-prefix css styles for cross browser compatibility
      // Output
      .pipe(postcss([ autoprefixer() ]))
      .pipe(cleanCss())
      .pipe(gulp.dest('assets/css'));
});

gulp.task('js', function () {
    return gulp.src(['src/js/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('assets/js'))

});

gulp.task('pack-js', function () {
  return gulp.src(['assets/js/vendor/jquery.min.js',
      'assets/js/vendor/jquery*.js',
      'assets/js/vendor/semantic.min*.js',
      'assets/js/vendor/moment*.js',
      'assets/js/vendor/numerals*.js',
      'assets/js/vendor/hammer*.js',
      'assets/js/vendor/chart.min.js',
      'assets/js/vendor/chartjs-plugin-zoom.min.js',
      'assets/js/vendor/jquery.jscrollpane.min.js',
      'assets/js/vendor/*.js', 'assets/js/*.js'])
      .pipe(concat('bundle.js'))
      .pipe(uglify())
      .pipe(gulp.dest('public/build/js'));
});

gulp.task('pack-css', function () {
  return gulp.src(['assets/css/vendor/semantic*.css','assets/css/vendor/tabulator_semantic-ui.min.css','assets/css/vendor/*.css','assets/css/**/*.css','assets/css/*.css'])
      .pipe(sourcemaps.init())
      .pipe(postcss([pfm()]))
      .pipe(concat('stylesheet.css'))
      .pipe(cleanCss())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('public/build/css'))
      .pipe(browserSync.stream());
});

gulp.task('reload', function (done) {
    console.log("Reloading Browser")
    browserSync.reload();
    done();
});


gulp.task('watch', ()=>{
    console.log("Watching SASS")
    watch('src/sass/**/*.scss',{ ignoreInitial: true }, series("sass","pack-css","reload"));
    // Or a composed task
    console.log("Watching JS")
    watch('src/js/*.js',{ ignoreInitial: true }, series("js","pack-js","reload"));
    console.log("Watching EJS")
    watch(['views/**/*.ejs'],{ ignoreInitial: true }, series("reload"));
    // watch("js/*.js", ['js-watch']);
})

gulp.task('browserSync', function(cd) {
    browserSync.init({
        files:['public/build/**/*.js','public/build/**/*.css'],
        proxy: "localhost:5000",
        ui: {
            port: 5001 //Or whatever port you want for browsersync ui
        },
    })
    cd();
})

gulp.task('pack', parallel(['pack-js', 'pack-css']));
gulp.task('default', series('clean',parallel(['sass', 'js']),'pack','browserSync','watch'));

// The `clean` function is not exported so it can be considered a private task.
// It can still be used within the `series()` composition.
function clean(cb) {
    // body omitted
    cb();
}

// The `build` function is exported so it is public and can be run with the `gulp` command.
// It can also be used within the `series()` composition.
function build(cb) {
    // body omitted
    cb();
}

if (process.env.NODE_ENV === 'development') {
    exports.default = "default";
} else {
    exports.default = "default";
}
