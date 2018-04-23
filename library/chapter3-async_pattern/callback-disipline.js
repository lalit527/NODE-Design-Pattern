// wrong way on handling error
if(err) {
    callback(err);
} else {
    // code to be executed
}

// correct way of handling error
if(err) {
    return callback(err);
}
// code to be executed in case of no error

