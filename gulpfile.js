'use strict';

let isProd = false;
const gulp = require('gulp');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const del = require('del');
const gutil = require('gulp-util');
const license = require('gulp-license');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify');
const watchify = require('watchify');

const stylesSourcePath = './src/styles/**/*.scss';
const scriptsSourcePath = './src/scripts/**/*.js';
const htmlPath = './src/**/*.html';
const imagesPath = './src/images/**/*';

const bundles = {
  'freshhood-core': {
    url: './src/scripts/freshhood-core.js',
    name: 'freshhood-core.js',
    bundle: null
  }
};

function createBundle(url) {
  return browserify(url, {
    debug: !isProd
  });
}

function watchBundles() {
  let watch = null;
  for (let bundleName in bundles) {
    watch = watchify(bundles[bundleName].bundle);
    watch.on('update', () => {
      console.log(`updating bundle ${bundleName}`);
      buildBundle(bundleName);
    });
  }
}

function buildBundle(bundleName) {
  const job = bundles[bundleName];
  const bundle = job.bundle;
  const name = job.name;

  let b = bundle.bundle()
    .on('log', gutil.log.bind(gutil, 'Browserify Log'))
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source(name))
    .pipe(buffer());

  if (isProd) {
    b = b.pipe(uglify().on('error', gutil.log.bind(gutil, 'Uglify Error')));
  }

  return b.pipe(license('MIT', {
    organization: 'Benoit Quenaudon',
    tiny: true
  })).pipe(gulp.dest('./scripts'));
}

gulp.task('clean', done => del(['*.html', './styles', './scripts', './images'], done));

gulp.task('styles', () => {
  return gulp.src(stylesSourcePath)
    .pipe(sass({
      outputStyle: isProd ? 'compressed' : 'expanded'
    }).on('error', sass.logError))
    .pipe(license('MIT', {
      organization: 'Benoit Quenaudon',
      tiny: true
    }))
    .pipe(gulp.dest('./styles'));
});

gulp.task('scripts', function() {
  for (let bundleName in bundles) {
    buildBundle(bundleName);
  }
});

gulp.task('watch', function() {
  gulp.watch(stylesSourcePath, ['styles']);
  gulp.watch(imagesPath, ['images']);
  gulp.watch(htmlPath, ['html']);
  gulp.watch(imagesPath, ['images']);

  watchBundles();
});

gulp.task('images', () => {
  return gulp.src(imagesPath)
    .pipe(gulp.dest('./images'));
});

gulp.task('html', () => {
  return gulp.src(htmlPath)
    .pipe(gulp.dest('.'));
});

(() => {
  for (let bundleName in bundles) {
    bundles[bundleName].bundle = createBundle(bundles[bundleName].url);
  }
})();

var allTasks = ['styles', 'scripts', 'images', 'html'];

gulp.task('default', cb => {
  return runSequence('clean', allTasks, 'watch', cb);
});

gulp.task('prod', cb => {
  isProd = true;
  return runSequence('clean', allTasks, cb);
});
