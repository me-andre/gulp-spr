var fs = require('fs'),
    vFile = require('vinyl'),
    async = require('async'),
    path = require('path'),
    through2 = require('through2'),
    spr = require('sprjs');

module.exports = gulpSpr;

function gulpSpr() {
    var isRead = false;
    return through2.obj({objectMode: true}, function(file, __, callback) {
        if (isRead) return;
        isRead = true;
        var dir = path.dirname(file.path),
            self = this;
        spr(file.path, function(err, files) {
            async.map(files, function(file, cb) {
                fs.readFile(path.join(dir, file), cb);
            }, function(err, contents) {
                err ? self.emit('error', err) : self.push(makeVinylFile(path.relative(dir, file.path), contents));
                self.push(null);
            });
        });
    });
}

function makeVinylFile(path, contents) {
    return new vFile({path: path, contents: new Buffer(contents.join('\n'), 'utf-8')});
}