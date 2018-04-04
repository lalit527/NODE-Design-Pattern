//this function behaves syncif the file is cached and asyn if the file is to be read
const fs = require('fs');
const cache = {};
function inconsistentRead(filename, callback) {
    if(cache[filename]) {
        process.nextTick(() => callback(cache[filename]));
        //may use setImmediate
    }else{
        fs.readFile(filename, 'utf-8', (err, data) => {
            cache[filename] = data;
            callback(data);
        });
    }
}

//calling the above function
function createFileReader(filename) {
    const listeners = []; 
    inconsistentRead(filename, value => { 
        listeners.forEach(listener => listener(value)); 
    });
    return { 
        onDataReady: listener => listeners.push(listener) 
    };    
}

const reader1 = createFileReader('data.txt');
reader1.onDataReady(data => {
    console.log('First Call data: '+ data);
    //sometime later we try to read the file again
    const reader2 = createFileReader('data.txt');
    reader2.onDataReady(data => {
        console.log('Second Call data: '+ data);
    });
});