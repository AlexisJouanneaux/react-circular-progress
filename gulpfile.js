var gulp = require('gulp');
var clean = require('gulp-clean');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');

var paths = (function() {

    var src = './src/',
        dst = './dst/';

    return {
        src: src,
        dst: dst,
        js: src + 'js/',
        css: src + 'css/',
        scss: src + 'scss/'
    }

}());

var files = {
    js: paths.js + '**/*.js',
    css: paths.css + '**/*.css',
    scss: paths.scss + '**/*.scss',
    html: paths.src + '**/*.html'
};

gulp.task('bundle', function() {
    var bundler = browserify({
        entries: [paths.js + 'app.js'],
        debug: true
    });

    var bundle = function() {
        return bundler.
            bundle().
            pipe(source('bundle.js')).
            pipe(buffer()).
            pipe(gulp.dest(paths.dst));
    };

    return bundle();
});

gulp.task('copy', function() {
    gulp.src(files.html).pipe(gulp.dest(paths.dst));
});

gulp.task('clean', function() {
    gulp.src(paths.dst).pipe(clean());
});

gulp.task('watch', function() {
    gulp.watch(files.js, ['bundle']);
    gulp.watch(files.html, ['copy']);
});

gulp.task('default', ['clean', 'watch', 'bundle', 'copy']);
