/**Fix for the above issue, make readFile sync */
const fs = require('fs');
const cache = {};
function syncRead(filename) {
    if(cache[filename]) {
        return (cache[filename]);
    }else{
        cache[filename] = fs.readFileSync(filename, 'utf-8');
        return (cache[filename]);
    }
}

//calling the above function
function createFileReader(filename) {
    const data = syncRead(filename);
    return { 
        data
    };    
}

const reader1 = createFileReader('data.txt');
console.log('First Call data: '+reader1.data);
const reader2 = createFileReader('data.txt');
console.log('Second Call data: '+ reader2.data);
