/**
 * Normal callback approach
 */
asyncOperation(arg, (err, result) => {
    if(err){
        // handle error
    } 
    // do stuff with the result
});

asynOperation(arg)
    .then(result => {
        // do stuff with the result
    }, err => {
        // handle error
    });