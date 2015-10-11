var gulp = require('gulp'),
    concat = require('gulp-concat'),
    webserver = require('gulp-webserver'),
    karmaServer = require('karma').Server,
    uglify = require('gulp-uglify'),
    sass = require('gulp-ruby-sass'),
    src = {
        bower: 'bower_components/'
    },
    vendor = [
        src.bower + 'jquery/dist/jquery.min.js',
        src.bower + 'underscore/underscore-min.js',
        src.bower + 'angular/angular.min.js',
        src.bower + 'angular-mocks/angular-mocks.js',
        src.bower + 'ui-router/release/angular-ui-router.min.js',
        src.bower + 'angular-touch/angular-touch.min.js',
        src.bower + 'ng-dialog/js/ngDialog.min.js',
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
        'filters/*.js',
        'mapsize.js'
    ],
    styles = [
        src.bower + 'normalize.css/normalize.css',
        src.bower + 'bootstrap/dist/css/bootstrap.min.css',
        src.bower + 'seiyria-bootstrap-slider/dist/css/bootstrap-slider.min.css',
        src.bower + 'ng-dialog/css/ngDialog.min.css',
        src.bower + 'ng-dialog/css/ngDialog-theme-default.min.css'
    ];

gulp.task('webserver', function () {
    gulp.src('.')
        .pipe(webserver({
            host: '0.0.0.0',
            livereload: true,
            directoryListing: false
        }));
});

gulp.task('unit-tests', function (done) {
  new karmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('vendor', function () {
    gulp.src(vendor)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('js'));
});

gulp.task('styles', function () {
    gulp.src(styles)
        .pipe(gulp.dest('css'));
});

gulp.task('sass', function() {
  return sass('scss/global.scss', { style: 'expanded' })
    .pipe(gulp.dest('css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('scss/*.scss', ['sass']);
});

gulp.task('app', function () {
    gulp.src(app)
        .pipe(concat('app.js'))
        .pipe(gulp.dest('js'));
});

gulp.task('app:watch', function () {
  gulp.watch(app, ['app']);
});

gulp.task('compress', function() {
    gulp.src(app)
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('js'));
});

gulp.task('default', function () {
    gulp.run('styles', 'sass', 'sass:watch', 'app', 'app:watch', 'unit-tests', 'webserver');
});
