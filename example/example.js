var tarGzip = require('../lib');

tarGzip.compress({
    source: '../example',
    destination: '../example.tar.gz',
    level: 6, // optional
    memLevel: 6 // optional
}, function () {
    tarGzip.decompress({
        source: '../example.tar.gz',
        destination: './unpack-example'
    }, function () {
        console.log('done');
    });
});