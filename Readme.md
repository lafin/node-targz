### Simple gzip compression and decompression utility for Node.js
___

### Installation

```bash
$ npm install node-targz
```

### Example
```js
var tarGzip = require('node-targz');

tarGzip.compress({
    source: './example',
    destination: 'example.tar.gz',
    level: 6, // optional
    memLevel: 6 // optional
}, function () {
    tarGzip.decompress({
        source: 'example.tar.gz',
        destination: './example'
    });
});
```

### Contributors

 * Author: [lafin](https://github.com/lafin)

### License

  [MIT](LICENSE)
