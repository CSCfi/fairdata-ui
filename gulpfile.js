var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass= require('gulp-sass');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var fileinclude = require('gulp-file-include');
var port = process.env.SERVER_PORT || 3000

function reload(done) {
    browserSync.reload();
    done();
}

// Combine html partials and components
gulp.task('html-build', gulp.series(function() {
    return gulp.src("./html/index.html")
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest("./docs"));
}));

gulp.task('sass', gulp.series(function() {
    return gulp.src("./scss/fairdata.scss")
        .pipe(sass({
            includePaths: ['node_modules']
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(concat('fairdata.css'))
        .pipe(gulp.dest("./dist"));
}));

// Compile and minify only the notification component to an independent unit
gulp.task('sass-notification', gulp.series(function() {
    return gulp.src("./scss/notification.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(concat('notification.css'))
        .pipe(gulp.dest("./dist"));
}));

// Compile (does not minify) footer component and Bootstrap grid
gulp.task('sass-footer', gulp.series(function() {
    return gulp.src("./scss/footer.scss")
        .pipe(sass({
            includePaths: ['node_modules']
        }))
        .pipe(cleanCSS({format: 'beautify'}))
        .pipe(concat('footer.css'))
        .pipe(gulp.dest("./dist"));
}));

// Compile sass used in documentation and auto-inject into browsers
gulp.task('sass-docs', gulp.series(function() {
    return gulp.src("./scss/docs/*.scss")
        .pipe(sass({
            includePaths: ['node_modules']
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(concat('fairdata-docs.css'))
        .pipe(gulp.dest("./docs"))
        .pipe(browserSync.stream());
}))

// Serve files from docs folder
gulp.task('serve', gulp.series('sass', function() {
    browserSync.init({
        server: 'docs',
        port: port,
        open: false,
        ui: false
    });

}));

// Watch changes in files and build sass/reload browsers
gulp.task('watch', function() {
    gulp.watch("./scss/**/*.scss", gulp.series('sass-docs'));
    gulp.watch("./html/**/*.html", gulp.series('html-build'));
    gulp.watch("./docs/*.html", gulp.series(reload));
})

gulp.task('build', gulp.parallel('sass', 'sass-notification', 'sass-footer', function() {
    return gulp.src(['./fonts/**/*'])
        .pipe(gulp.dest('./dist/fonts'));
}))

gulp.task('default', gulp.series('html-build', gulp.parallel('serve', 'watch')));