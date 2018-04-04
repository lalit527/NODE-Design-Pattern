fs.readFile('foo.txt', 'utf8', (err, data) => { 
    if(err) 
        handleError(err); 
    else 
        processData(data); 
});