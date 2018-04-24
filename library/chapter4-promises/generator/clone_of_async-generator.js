const fs = require('fs'); 
const path = require('path');

function asyncFlow(generatorFunction) {
    console.log('It is here1');
    function callback(err) {
        console.log('It is here');
        if(err) {
            return generator.throw(err);
        }
        const results = [].slice.call(arguments, 1);
        console.log(results);
        generator.next(results.length > 1 ? results:results[0]);
    }
    const generator = generatorFunction(callback);
    generator.next();
}

function asyncFlowWithThunks(generatorFunction) {
    function callback(err) {
        console.log('It is here');
        if(err) {
            return generator.throw(err);
        }
        const results = [].slice.call(arguments, 1);
        const thunk = generator.next(results.length > 1 ? results:results[0]).value;
        thunk && thunk(callback);
    }
    const generator = generatorFunction(callback);
    generator.next();
}

asyncFlow(function* (callback) { 
    const fileName = path.basename(__filename); 
    const myself = yield fs.readFile(fileName, 'utf8', callback); 
    yield fs.writeFile(`clone_of_${fileName}`, myself, callback); 
    console.log('Clone created'); 
});

// asyncFlowWithThunks(function* () { 
//     const fileName = path.basename(__filename); 
//     const myself = yield readFileThunk(__filename, 'utf8'); 
//     yield writeFileThunk(`clone_of_${fileName}`, myself); 
//     console.log("Clone created"); 
// });