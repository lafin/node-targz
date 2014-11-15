var tar = require('tar'),
    zlib = require('zlib'),
    fstream = require('fstream');

exports = module.exports = {
    compress: function (params, callback) {
        callback = callback || function () {};
        var error = function (error) {
            throw error;
        };
        process.nextTick(function () {
            var stream = fstream.Reader(params.source);
            stream.on('error', error);
            stream.pipe(tar.Pack({
                    noProprietary: true
                }))
                .pipe(zlib.createGzip({
                    level: params.level || 6,
                    memLevel: params.memLevel || 6
                }))
                .on('error', error)
                .pipe(fstream.Writer(params.destination)
                    .on('error', error)
                    .on('close', callback));
        });
    },
    decompress: function (params, callback) {
        callback = callback || function () {};
        var error = function (error) {
            throw error;
        };
        process.nextTick(function () {
            var stream = fstream.Reader(params.source);
            stream.on('error', error);
            stream.pipe(zlib.createGunzip())
                .on('error', error)
                .pipe(tar.Extract({
                        path: params.destination
                    })
                    .on('error', error)
                    .on('close', callback));
        });
    }
};