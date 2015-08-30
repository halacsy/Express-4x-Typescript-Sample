var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  livereload = require('gulp-livereload'),
  ts = require('gulp-typescript'),
  sass = require('gulp-sass'),
  env = require('gulp-env'),
  nodeDebug = require('gulp-node-debug'),
  mocha = require('gulp-mocha'),
  gutil = require('gulp-util');

gulp.task('mocha', function() {
    return gulp.src(['test/*.js'], { read: false })
        .pipe(mocha({ reporter: 'list' }))
        .on('error', gutil.log);
});

gulp.task('watch-mocha', function() {
    gulp.watch(['lib/**', 'test/**'], ['mocha']);
});
gulp.task('sass', function () {
  console.log('Compiling sass');
  return gulp.src('./public/scss/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('deploy/public/css'));
});

gulp.task('reload-sass', function() {
  console.log('Compiling sass');
  return gulp.src('./public/scss/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('deploy/public/css'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  gulp.watch('./public/scss/*.scss', ['reload-sass']);
  gulp.watch('./server/**/*.ts', ['typescript']);
});

gulp.task('typescript', function() {
  console.log('Compiling typescript');
  return gulp.src(['server/**/*.ts'])
    .pipe(ts({module: 'commonjs'})).js.pipe(gulp.dest('./deploy/server'))
});

gulp.task('images', function() {
  gulp.src('public/images/**/*').pipe(gulp.dest('deploy/public/images'))
});

gulp.task('views', function() {
  gulp.src('server/**/views/**/*').pipe(gulp.dest('./deploy/server'))
});

gulp.task('build', ['sass', 'typescript', 'images', 'views']);

gulp.task('deploy', ['build'], function() {
  return gulp.src(['package.json', 'Procfile'])
    .pipe(gulp.dest('./deploy'));
});

gulp.task('serve',  ['deploy','set-env'], function () {
 
  livereload.listen();
  nodemon({
    script: 'deploy/server/www.js',
    ext: 'js ejs',
  }).on('restart', function () {
    setTimeout(function () {
      livereload.changed();
    }, 500);
  });
});

gulp.task('debug', ['set-env'], function() {
    gulp.src('deploy/server/www.js')
        .pipe(nodeDebug({
            debugBrk: true
        }));
});

gulp.task('set-env', function () {
    env({
        file: '.env.json',
       // type: 'ini',
        vars:{
         // MONGODB_URI : 'localhost/test'
        }
    });
});


gulp.task('test', ['typescript', 'set-env'], function() {
    return gulp.src(['deploy/server/**/test.js'], { read: false })
        .pipe(mocha({ reporter: 'list' }))
        .on('error', gutil.log);
});
/*
gulp.task('test', function() {
    gulp.watch(['server/**'], ['mocha']);
});
*/

gulp.task('default', [
  'set-env',
  'build',
  'watch',
  'serve'
]);