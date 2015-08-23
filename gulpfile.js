var gulp = require('gulp');
var concat = require('gulp-concat');
var webserver = require('gulp-webserver');
var uglify = require('gulp-uglify');
var vendor = [
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/angular/angular.min.js',
    'bower_components/ui-router/release/angular-ui-router.min.js',
    'bower_components/angular-cookies/angular-cookies.min.js',
    'bower_components/ngstorage/ngStorage.min.js',
    'bower_components/checklist-model/checklist-model.js',
    'bower_components/raty/lib/jquery.raty.js'
];
var app = [
    '**/*.module.js',
    'app.config.js',
    'app.key.js',
    'services/*.js',
    'controllers/*.js',
    'directives/*.js',
    'mapsize.js'
];

var styles = [
  'bower_components/normalize.css/normalize.css',
  'bower_components/bootstrap/dist/css/bootstrap.min.css'
];

gulp.task('webserver', function() {
    gulp.src('.')
        .pipe(webserver({
            host: '0.0.0.0',
            livereload: true,
            directoryListing: false
        }));
});

gulp.task('vendor', function() {
    gulp.src(vendor)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('js'))
});

gulp.task('styles', function() {
    gulp.src(styles)
        .pipe(gulp.dest('css'))
});

gulp.task('app', function() {
    gulp.src(app)
        .pipe(concat('app.js'))
        .pipe(gulp.dest('js'))
});


gulp.task('default', function() {
    gulp.run('vendor', 'styles', 'app', 'webserver');
    gulp.watch(app, ['app']);
});
