/**
 * Generic Gulpfile for building out our assets for HotelMap Projects.
 * Jim
 */

/* Project Information */
require("./project/Project.js");


/* Module Requirement */
var gulp = require('gulp');
var uglifycss = require('gulp-uglifycss');
var browserSync = require('browser-sync').create();
var webpack = require('webpack-stream');
var sass = require('gulp-sass');

/* Local Webpack file */
var webpackConfig = require("./webpack.config.js");

/* Assets */
var css_assets = ['./src/css/app.css'];
var sas_assets = ['./src/css/app-sas.scss']




/**
 * Gulp Task: Builds CSS
 * @param <array> css_assets
 */
gulp.task('build_css', function(){
    console.log("Processing CSS Assets: " + css_assets);
    if (HIPCHAT_NOTIFY_ONBUILD == true) {
        console.log("Notifying HipChat room of new CSS build");
        chat("green", "Building CSS/SCSS assets");
    }
    return gulp.src(css_assets)
        .pipe(uglifycss({
          "maxLineLen": 80,
          "uglyComments": true
      }))
    .pipe(gulp.dest(BUILD_DESTINATION+'/'+PROJECT_NAME));
});

/**
 * Gulp Task: Builds SASS
 * @param <array> sas_assets
 */
gulp.task('build_scss', function() {
    console.dir(sas_assets);

    return gulp.src(sas_assets)
        .pipe(sass().on('error',
            function(error) {
                var error = error.messageFormatted;
                chat("red", "SCSS Error: " + error);
            }))
        .pipe(uglifycss({
          "maxLineLen": 80,
          "uglyComments": true
        }))
        .pipe(gulp.dest(BUILD_DESTINATION+'/'+PROJECT_NAME));
});

/**
 * Runs a browser sync for the auto updates
 */
gulp.task('browserSync', function() {
  browserSync.init({
    proxy: "localhost:80"
  })
})

/**
 * Gulp Task: Watches css and js for changes
 */
gulp.task('watch', ['css:watch','js:watch']);

/**
 * Gulp Task: Watchs CSS
 */
gulp.task('css:watch', function(){
    console.log("Watching assets in CSS using build task..");
    gulp.watch([css_assets,sas_assets], ['build_scss','build_css']);
});

/**
 * Gulp Task: Watches JS and runs through webpack
 */
gulp.task('js:watch', function(){
    console.log("Watching assets in JS using WebPack");
    return  gulp.src('./src/')
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(BUILD_DESTINATION+'/'+PROJECT_NAME));

});
