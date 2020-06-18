var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass= require('gulp-sass');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var port = process.env.SERVER_PORT || 3000

function reload(done) {
    browserSync.reload();
    done();
}

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', gulp.series(function() {
    return gulp.src(["./scss/fairdata.scss", "./scss/docs/*.scss"])
        .pipe(sass({
            includePaths: ['node_modules']
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(concat('fairdata.css'))
        .pipe(gulp.dest("./docs"))
        .pipe(browserSync.stream());
}));

// Serve files from docs folder
gulp.task('serve', gulp.series('sass', function() {
    browserSync.init({
        server: {
            baseDir: "docs",
        },
        port: port
    });

}));

// Watch changes in files and build sass/reload browsers
gulp.task('watch', function() {
    gulp.watch("./scss/**/*.scss", gulp.series('sass'));
    gulp.watch("./docs/*.html", gulp.series(reload));
})

gulp.task('build', gulp.parallel(function() {
    return gulp.src(["./scss/fairdata.scss"])
        .pipe(sass({
            includePaths: ['node_modules']
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(concat('fairdata.css'))
        .pipe(gulp.dest("./dist/css"));
}, function() {
    return gulp.src(['./fonts/**/*'])
        .pipe(gulp.dest('./dist/fonts'));
}))

gulp.task('default', gulp.parallel('serve', 'watch'));