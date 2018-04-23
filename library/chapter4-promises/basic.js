/**
 * Normal callback approach
 */
asyncOperation(arg, (err, result) => {
    if(err){
        // handle error
    } 
    // do stuff with the result
});

/**
 * Same operation with promises
 */
asynOperation(arg)
    .then(result => {
        // do stuff with the result
    }, err => {
        // handle error
    });

/**
 * Chaning of Promises
 */
asynOperation(arg)
    .then(result1 => {
        // do stuff with the result
        return asyncOperation(arg2);
    })
    .then(result2 => {
        // do stuff with the result
        return 'done';
    })
    .then(undefined, err => {
        //any error in the chain is caught here 
    });;