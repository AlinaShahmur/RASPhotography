let projectFolder = 'dist';
let sourceFolder = '#src';
let path = {
  build: {
    html: projectFolder + "/",
    css: projectFolder + "/css/",
    js: projectFolder + "/js/",
    img: projectFolder + "/img/",
    php: projectFolder + "/",
    phpMailer: projectFolder + "/PHPMailer/"
  },
  src: {
    html: [sourceFolder + "/*.html", '!' + sourceFolder + "/_*.html"],
    css: sourceFolder + "/scss/style.scss",
    cssPopup: sourceFolder + '/scss/customSlider.css',
    js: sourceFolder + "/js/*.js",
    img: sourceFolder + "/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}",
    php: sourceFolder + "/*.php",
    phpMailer: sourceFolder + "/PHPMailer/**/*",
  },
  watch: {
    html: sourceFolder + "/**/*.html",
    css: sourceFolder + "/scss/**/*.scss",
    js: sourceFolder + "/js/**/*.js",
    img: sourceFolder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    php: sourceFolder + "/*.php",
    phpMailer: sourceFolder + "/PHPMailer/**/*",
  },
  clean: "./" + projectFolder + "/"
}

let {src, dest} = require('gulp'),
          gulp = require('gulp'),
          browsersync = require('browser-sync'),
          fileinclude = require('gulp-file-include'),
          del = require('del'),
          scss = require('gulp-sass'),
          autoprefixer = require('gulp-autoprefixer'),
          clean_css = require('gulp-clean-css'),
          rename = require('gulp-rename'),
          uglify = require('gulp-uglify-es').default,
          imagemin = require('gulp-imagemin'),
          group_media = require('gulp-group-css-media-queries');

scss.compiler = require('sass');

function browserSync() {
    browsersync.init({
      server: {
        baseDir: "./" + projectFolder + "/"
      },
      port: 3000,
      notify: false 
    }) 
}

function html() {
    return src(path.src.html)
    .pipe(fileinclude())
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream())
} 

function css() {
  return src(path.src.css)
    .pipe(
      scss({
        outputStyle: 'expanded'
      })
    )
    .pipe(group_media())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 5 versions'],
        cascade: true
      })
    )
    .pipe(dest(path.build.css))
    .pipe(clean_css())
    .pipe(
      rename({
        extname: ".min.css"
      })
    )
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream())
}

function cssPopup() {
    return src(path.src.cssPopup)
    .pipe(dest(path.build.css))
    .pipe(clean_css())
    .pipe(
      rename({
        extname: ".min.css"
      })
    )
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream())
}

function js() {
  return src(path.src.js)
  .pipe(dest(path.build.js))
  .pipe(uglify())
  .pipe(
    rename({
      extname: ".min.js"
    })
  )
  .pipe(dest(path.build.js))
  .pipe(browsersync.stream())
} 

function php() {
  return src(path.src.php)
    .pipe(dest(path.build.php))
    .pipe(browsersync.stream())
}


function phpMailer() {
  return src(path.src.phpMailer)
    .pipe(dest(path.build.phpMailer))
    .pipe(browsersync.stream())
}

function images() {
  return src(path.src.img)
  .pipe(imagemin({
      interlaced: true,
      progressive: true,
      optimizationLevel: 3,
  }))
  .pipe(dest(path.build.img))
  .pipe(browsersync.stream())
} 


function watchFiles() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
    gulp.watch([path.watch.php], php);
    gulp.watch([path.watch.phpMailer], phpMailer);
}

function clean() {
  return del(path.clean);
}


let build = gulp.series(clean,gulp.parallel(html,css,cssPopup,js,php,phpMailer,images))
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.phpMailer = phpMailer;
exports.php = php;
exports.cssPopup = cssPopup;
exports.images = images
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;