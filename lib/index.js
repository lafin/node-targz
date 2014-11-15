var tar = require('tar-fs'),
    zlib = require('zlib'),
    fs = require('fs');

exports = module.exports = {
    compress: function (params, callback) {
        callback = callback || function () {};
        var error = function (error) {
            throw error;
        };
        process.nextTick(function () {
            tar.pack(params.source)
                .on('error', error)
                .pipe(zlib.createGzip({
                        level: params.level || 6,
                        memLevel: params.memLevel || 6
                    })
                    .on('error', error))
                .pipe(fs.createWriteStream(params.destination)
                    .on('error', error)
                    .on('finish', callback));
        });
    },
    decompress: function (params, callback) {
        callback = callback || function () {};
        var error = function (error) {
            throw error;
        };
        process.nextTick(function () {
            fs.createReadStream(params.source)
                .on('error', error)
                .pipe(zlib.createGunzip()
                    .on('error', error))
                .pipe(tar.extract(params.destination)
                    .on('error', error)
                    .on('finish', callback));
        });
    }
};