//synchronous code -- direct style
function addSyn(a, b) {
    return a+b;
}

//continous passing style -- synchronous callback
function addSyncCPS(a, b, callback) {
    callback(a+b);
}



//asynchronous CPS
function addAsyncCPS(a, b, callback) {
    setTimeout(() => callback(a+b), 100);
}

console.log('before'); 
addAsyncCPS(1, 2, result => console.log('Result: ' + result)); 
console.log('after');

//non-continous passing style
const result = [1, 2, 3].map(element => element - 1);
console.log(result);