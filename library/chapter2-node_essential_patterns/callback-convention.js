const fs = require('fs'); 
/** Node convention of callbacks
fs.readFile('foo.txt', 'utf8', (err, data) => { 
    if(err) 
        handleError(err); 
    else 
        processData(data); 
});
*/


function readJSON(filename, callback) {
    fs.readFile(filename, 'utf8', (err, data) => { 
        let parsed; 
        if(err) //propagate the error and exit the current function 
            return callback(err);
        try { 
            //parse the file contents 
            parsed = JSON.parse(data); } 
        catch(err) {
            //catch parsing errors
            return callback(err); 
        } 
        //no errors, propagate just the data 
        callback(null, parsed);
        });
}

readJSON('foo.json', (err, data) => {
    if(err)
        console.log(err);
    else
        console.log(data);
});


