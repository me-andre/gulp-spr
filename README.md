# Gulp-SPR

See [SPRjs](https://www.npmjs.com/package/sprjs) for explanations.

## Installation

`npm i gulp-spr`

## Usage

    var gulp = require('gulp'),
        spr = require('gulp-spr');

        gulp.src('path/to/main.js')
            .pipe(spr())
            .pipe(gulp.dest('dest/dir'));

## Tips

When you build for production it may be useful to wrap resulting javascript in a closure:

    var gulp = require('gulp'),
        spr = require('gulp-spr'),
        wrap = require('gulp-wrap');

        gulp.src('path/to/main.js')
            .pipe(spr())
            .pipe(wrap('(function() {\n<%= contents %>\n})();'))
            .pipe(gulp.dest('dest/dir'));

This extended recipe shows how to conditionally wrap and minify your code:

    var gulp = require('gulp'),
        spr = require('gulp-spr'),
        wrap = require('gulp-wrap'),
        uglify = require('gulp-uglify'),
        util = require('gulp-util');

        gulp.src('path/to/main.js')
            .pipe(spr())
            .pipe(production() ? wrap('(function() {\n<%= contents %>\n})();') : util.noop())
            .pipe(production() ? uglify() : util.noop())
            .pipe(gulp.dest('dest/dir'));

        function production() { return Math.random() > 0.5 }

And of course you can use any `gulp` plugin you are common with.
