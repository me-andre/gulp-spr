# Gulp-SPR

See [SPRjs](https://www.npmjs.com/package/sprjs) for explanations.

## Installation

`npm i gulp-spr`

## Usage

    var gulp = require('gulp'),
        gulpSpr = require('gulp-spr');

        gulp.src('path/to/main.js')
            .pipe(gulpSpr())
            .pipe(gulp.dest('dest/dir'));