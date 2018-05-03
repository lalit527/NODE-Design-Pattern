const fs = require('fs'); 
const crypto = require('crypto');

const sha1Stream = crypto.createHash('sha1'); 
sha1Stream.setEncoding('base64');

const md5Stream = crypto.createHash('md5'); 
md5Stream.setEncoding('base64');

const inputFile = process.argv[2]; 
const inputStream = fs.createReadStream(inputFile); 
inputStream
    .pipe(sha1Stream) 
    .pipe(fs.createWriteStream(inputFile + '.sha1'));

inputStream
    .pipe(md5Stream) 
    .pipe(fs.createWriteStream(inputFile + '.md5'));

// Both md5Stream and sha1Stream will be ended automatically when the input stream ends
// unless we specify { end: false } as an option while invoking pipe

// The two fork of the stream will receive thesame chunk of data

// Backpressure will work out of the box, the flow coming from input stream will go as fast as the slowest branch on the fork