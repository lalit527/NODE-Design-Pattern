const fs = require('fs');
const split = require('split');
const request = require('request');
const ParallelStream = require('./parallelstream');

fs.createReadStream(process.argv[2])
    .pipe(split())
    .pipe(new ParallelStream((url, enc, push, done) => {
        if (!url) return done();
        request.head(url, (err, response) => {
            push(url + ' is ' + (err != null ? 'down' : 'up') + '\n');
            done();
        });
    }))
    .pipe(fs.createWriteStream('results.txt'))
    .on('finish', () => console.log('All urls were checked'));