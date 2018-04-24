function* makeGenerator() {
    yield 'Hello World'; 
    console.log('Re-entered');
    // body
}

function* fruitGenerator() {
    yield 'apple'; 
    yield 'orange'; 
    return 'watermelon';
}

/*
const newFruitGenerator = fruitGenerator();
console.log(newFruitGenerator.next());
console.log(newFruitGenerator.next());
console.log(newFruitGenerator.next());
*/

// Generator as Iterator
function* iteratorGenerator(arr) {
    for(let i = 0; i <  arr.length; i++) {
        yield arr[i];
    }
}

const iterator = iteratorGenerator(['apple', 'orange', 'watermelon']);
let currentItem = iterator.next();
while(!currentItem.done) {
    console.log(currentItem.value);
    currentItem = iterator.next();
}

/**
 * Passing value back to generator
 */
function* twoWayGenerator() {
    const what = yield null;
    console.log('Hello ' + what);
}
const twoWay = twoWayGenerator(); 
twoWay.next(); 
twoWay.next('world');
twoWay.next('again');