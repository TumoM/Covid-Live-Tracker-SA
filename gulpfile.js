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
    return gulp.src(['public/build/**/*','assets/css/*.css','assets/css/*.css.map','assets/js/*.js'], {read: false})
        .pipe(clean());
})
// Compile SASS --> CSS, the minify CSS
gulp.task('sass', function () {
  return gulp.src(['src/sass/*.scss', 'src/sass/**/*.scss'])
      // Compile SASS files
      .pipe(sass({
        outputStyle: 'compressed',
        precision: 2,
        sourceMap: true,
        outfile:'assets/css',
        includePaths: ['./','src/sass/font_awsome'],
        onError: console.error.bind(console, 'Sass error:')
      }))
      // Auto-prefix css styles for cross browser compatibility
      // Output
      .pipe(sourcemaps.init())
      .pipe(postcss([ autoprefixer() ]))
      
      .pipe(sourcemaps.write('.'))
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
      'assets/js/vendor/semantic*.js',
      'assets/js/vendor/moment*.js',
      'assets/js/vendor/numerals*.js',
      'assets/js/vendor/hammer*.js',
      'assets/js/vendor/chart.min.js',
      'assets/js/vendor/chartjs-plugin-zoom.min.js',
      'assets/js/vendor/jquery.jscrollpane.min.js',
      'assets/js/vendor/tabulator*.js',
      'assets/js/vendor/*.js', 'assets/js/**/*.js'])
      .pipe(concat('bundle.js'))
      .pipe(uglify())
      .pipe(gulp.dest('public/build/js'));
});

gulp.task('pack-css', function () {
  return gulp.src(['assets/css/vendor/semantic*.css','assets/css/vendor/tabulator_semantic-ui*.css','assets/css/vendor/*.css','assets/css/**/*.css','assets/css/*.css'])
      .pipe(purify([
        'src/js/*.js',
        'assets/**/*.js',
        'views/**/*.ejs',
        'helpers/**/*.js'],
      { info: true,rejected:false, whitelist}))
    .pipe(sourcemaps.init())
    .pipe(concat('stylesheet.css'))
      .pipe(postcss([
        // pfm(),
        combineMedia(),
        combineSelectors({removeDuplicatedProperties: true}),
        autoprefixer(),
        cssnano({
          preset: ['advanced', {
            discardComments: {
              removeAll: true,
            },
          }]
        }),
      ]))
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
    watch('src/sass/**/*.scss',{ ignoreInitial: true }, series("sass","pack-css"));
    // Or a composed task
    console.log("Watching JS")
    watch(['src/js/*.js',"views/**/*.ejs"],{ ignoreInitial: true }, series("js","pack-js"));
    console.log("Watching EJS")
    // watch("views/**/*.ejs", series("pack"));
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

// The lint task
gulp.task('lint', function() {
  return gulp
    // Define the source files
    .src(['src/js/*.js'])
    .pipe(eslint({}))
    // Output the results in the console
    .pipe(eslint.format());
});
// The lint task
gulp.task('lintF', function() {
  return gulp
    // Define the source files
    .src(['src/js/*.js'])
    .pipe(eslint({fix:true}))
    // Output the results in the console
    .pipe(eslint.format());
});

gulp.task('pack', parallel(['pack-js', 'pack-css']));
gulp.task('default', series('clean',parallel(['sass', 'js']),'pack','watch'));
gulp.task('build', series('clean',parallel(['sass', 'js']),'pack'));

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
