function asyncDivision(dividend, divisor, cb) {
    return new Promise((resolve, reject) => {
        process.nextTick(() => {
            const result = dividend / divisor;
            if (isNaN(result) || !Number.isFinite(result)) {
                const error = new Error('Invalid operands');
                if (cb) { cb(error); }
                return reject(error); }
                if (cb) { cb(null, result); } 
                resolve(result);
        });
    });
}

asyncDivision(10, 0, (error, result) => { 
    if (error) { 
        return console.error(error); 
    } 
    console.log(result); 
});

asyncDivision(22, 0)
    .then(result => console.log(result)) 
    .catch(error => console.error(error));