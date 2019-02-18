var gulp = require('gulp');
var server = require('gulp-webserver');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var clean = require('gulp-clean-css');
var uglify = require('gulp-uglify');

//开发环境
//起服务
gulp.task('servers', () => {
  return gulp.src('./src/')
   .pipe(server({
     port: '8080',
     open: true,
     livereload: true
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
//编译js,合并js
gulp.task('jses', () => {
  return gulp.src('./src/js/*.js')
   .pipe(babel({
     presets: 'es2015'
   }))
   .pipe(concat('all.js'))
   .pipe(gulp.dest('./src/js/'))
})
//创建默认任务
gulp.task('default', gulp.series('scss', 'jses', 'servers', 'watches'))



//线上环境
//压缩css
gulp.task('mincss', () => {
  return gulp.src('./src/css/*.css')
   .pipe(clean())
   .pipe(gulp.dest('./dist/css'))
})
//压缩js
gulp.task('minjs', () => {
  return gulp.src('./src/js/all.js')
   .pipe(uglify())
   .pipe(gulp.dest('./dist/js'))
})
//build任务
gulp.task('build', gulp.series('mincss', 'minjs'))
