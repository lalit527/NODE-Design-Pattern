const fs = require('fs');
function readJSONThrows(filename, callback) { 
    fs.readFile(filename, 'utf8', (err, data) => { 
        if(err) { 
            return callback(err); 
        } 
        //no errors, propagate just the data 
        callback(null, JSON.parse(data)); 
    });
};

//This call will abruptly terminate the program
readJSONThrows('data.txt', (err, data) => {
    if(err)
        console.log(err);
    else
        console.log(data);
});
//The below try-catch fix will not work as it travel back to the stack where exception was thrown
/*try{
    readJSONThrows('data.txt', (err, data) => {
        if(err)
            console.log(err);
        else
            console.log(data);
    });
}catch(err){
    console.log("Parsing Error");
}*/

process.on('uncaughtException', (err) => { 
    console.error('This will catch at last the ' + 'JSON parsing exception: ' + err.message); 
    // Terminates the application with 1 (error) as exit code:
    // without the following line, the application would continue 
    process.exit(1);
});

