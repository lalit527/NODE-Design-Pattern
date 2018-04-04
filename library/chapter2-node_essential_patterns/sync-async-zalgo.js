//this function behaves syncif the file is cached and asyn if the file is to be read
const fs = require('fs');
const cache = {};
function inconsistentRead(filename, callback) {
    if(cache[filename]) {
        callback(cache[filename]);
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

/** 
//Issue with above program
During creation of reader1 the cache is empty and our program behvaes asyn, so we have time to
register our listner as it will be invoked later in another cycle of event loop
Reader2 is created in the cycle of event loop in which the cache for requested file already exists
In this case the inner call to inconsistentRead will be sync, so it's cb is invoked immediately
which means all listener of reader2 will also be called sync, However we register the listener after creation
of reader2, so they will never be invoked
**/

/** All API should be fully sync/ async */
/**Fix for the above issue, make readFile sync */
