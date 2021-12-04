const {src, watch ,  dest, series} = require('gulp'); 
const sass  = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const terser = require('gulp-terser');
const cssnano = require('cssnano');
const browsersync = require('browser-sync').create();


//Sass Task
function scssTask(){
    //setting the source for the sass
    return src('app/scss/style.scss', {sourcemaps:true})

        .pipe(sass())
         //minify css
        .pipe(postcss([cssnano()]))
        //save to dist folder and save the sourcemaps in there
        // . dot means save in the same location 
        .pipe(dest('dist', {sourcemaps: '.'})); 

}
function jsTask (){
    return src('app/js/script.js', {sourcemaps:true})
    
        .pipe(terser())
        .pipe(dest('dist', {sourcemaps:'.'}));
}

//we need to use cb function because it is not a gulp plugin to tell the async we end  it we need explicitly  by that cb function 
function browsersyncServe(cb){
    browsersync.init({
        server:{
            baseDir: '.'
        }
    }); 
//to signify that it is complete
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