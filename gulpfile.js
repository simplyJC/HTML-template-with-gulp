const {src, watch ,  dest, series} = require('gulp'); 
const sass  = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const terser = require('gulp-terser');
const cssnano = require('cssnano');
const browsersync = require('browser-sync').create();

function scssTask(){

    return src('app/scss/style.scss', {sourcemaps:true})

        .pipe(sass())
        .pipe(postcss([cssnano()]))
  
        .pipe(dest('dist', {sourcemaps: '.'})); 

}
function jsTask (){
    return src('app/js/script.js', {sourcemaps:true})
    
        .pipe(terser())
        .pipe(dest('dist', {sourcemaps:'.'}));
}


function browsersyncServe(cb){
    browsersync.init({
        server:{
            baseDir: '.'
        }
    }); 
    cb();
}

function browsersyncReload(cb){
    browsersync.reload();
    cb();
}

function watchTask (){
    watch('*.html', browsersyncReload);
    watch(['app/scss/**/*.scss', 'app/js/**/*.js'], series (scssTask, jsTask, browsersyncReload));

}

exports.default = series(
    scssTask, 
    jsTask, 
    browsersyncServe, 
    watchTask

)