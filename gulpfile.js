var gulp = require('gulp');
var server = require('gulp-webserver');
var sass = require('gulp-sass');

//开发环境
//起服务
gulp.task('servers', () => {
  return gulp.src('./src/')
   .pipe(server({
     port: '8080',
     open: true,
     livereroad: true
   }))
})
//编译scss
gulp.task('scss', () => {
  return gulp.src('./src/scss/*.scss')
   .pipe(sass())
   .pipe(gulp.dest('./src/css/'))
})
//监听scss
gulp.task('watches', () => {
  gulp.watch('./src/scss/*.scss', gulp.series('scss'))
})
