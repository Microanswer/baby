const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');

const srcDir = 'src'; // 源代码目录
const distDir = 'dist'; // 编译后代码目录

// 定义任务：编译 Baby
gulp.task('build', function() {
    console.log("编译 Baby...");
    return browserify(`${srcDir}/Baby.js`, {debug: false})
        .bundle()
        .pipe(source("Baby.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init()) // 初始化源码映射
        .pipe(babel()) // 编译 ES6 代码
        .pipe(uglify()) // 压缩 JavaScript 代码
        .pipe(sourcemaps.write('.')) // 写入源码映射
        .pipe(gulp.dest(distDir))
});
