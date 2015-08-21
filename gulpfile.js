var gulp = require('gulp');
var concat = require('gulp-concat');
var webserver = require('gulp-webserver');
var vendor = [
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/angular/angular.min.js',
    'bower_components/ui-router/release/angular-ui-router.min.js',
    'bower_components/angular-cookies/angular-cookies.min.js',
    'bower_components/ngstorage/ngStorage.min.js'
];
var app = [
    '**/*.module.js',
    'app.config.js',
    'app.key.js',
    'services/*.js',
    'controllers/*.js',
    'directives/*.js',
    'mapsize.js',
    'maplogic.js'
];

gulp.task('webserver', function() {
    gulp.src('.')
        .pipe(webserver({
            host: '0.0.0.0',
            livereload: true,
            directoryListing: false,
            open: true
        }));
});

gulp.task('vendor', function() {
    gulp.src(vendor)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('js'))
});

gulp.task('app', function() {
    gulp.src(app)
        .pipe(concat('app.js'))
        .pipe(gulp.dest('js'))
});


gulp.task('default', function() {
    gulp.run('vendor', 'app', 'webserver');
    gulp.watch(app, ['app']);
});
