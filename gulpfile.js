var gulp = require('gulp'),
    concat = require('gulp-concat'),
    webserver = require('gulp-webserver'),
    uglify = require('gulp-uglify'),

    src = {
        bower: 'bower_components/'
    },

    vendor = [
        src.bower + 'jquery/dist/jquery.min.js',
        src.bower + 'angular/angular.min.js',
        src.bower + 'ui-router/release/angular-ui-router.min.js',
        src.bower + 'angular-touch/angular-touch.min.js',
        src.bower + 'ngstorage/ngStorage.min.js',
        src.bower + 'checklist-model/checklist-model.js',
        src.bower + 'raty/lib/jquery.raty.js',
        src.bower + 'seiyria-bootstrap-slider/dist/bootstrap-slider.min.js',
        src.bower + 'angular-bootstrap-slider/slider.js',
        src.bower + 'angular-adaptive-detection/angular-adaptive-detection.min.js'
    ],

    app = [
        '**/*.module.js',
        'app.config.js',
        'app.key.js',
        'services/*.js',
        'controllers/*.js',
        'directives/*.js',
        'mapsize.js'
    ],

    styles = [
        src.bower + 'normalize.css/normalize.css',
        src.bower + 'bootstrap/dist/css/bootstrap.min.css',
        src.bower + 'seiyria-bootstrap-slider/dist/css/bootstrap-slider.min.css'
    ];

gulp.task('webserver', function () {
    gulp.src('.')
        .pipe(webserver({
            host: '0.0.0.0',
            livereload: true,
            directoryListing: false
        }));
});

gulp.task('vendor', function () {
    gulp.src(vendor)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('js'))
});

gulp.task('styles', function () {
    gulp.src(styles)
        .pipe(gulp.dest('css'))
});

gulp.task('app', function () {
    gulp.src(app)
        .pipe(concat('app.js'))
        .pipe(gulp.dest('js'))
});


gulp.task('default', function () {
    gulp.run('vendor', 'styles', 'app', 'webserver');
    gulp.watch(app, ['app']);
});
