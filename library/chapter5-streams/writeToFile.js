const ToFileStream = require('./toFileStream');
const tfs =  new ToFileStream();

tfs.write({path: 'test1.txt', content: 'Hello World'});
tfs.write({path: 'test2.txt', content: 'Node JS'});
tfs.write({path: 'test3.txt', content: 'Streams'});

tfs.end(() => console.log('All files are created'));