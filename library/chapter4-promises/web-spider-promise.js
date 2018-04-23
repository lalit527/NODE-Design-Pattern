const utilities = require('./utilities');
const request = utilities.promisify(require('request')); 
const mkdirp = utilities.promisify(require('mkdirp')); 
const fs = require('fs'); 
const readFile = utilities.promisify(fs.readFile); 
const writeFile = utilities.promisify(fs.writeFile);

function download(url, filename) {
    console.log(`Downloading ${url}`);
    let body;
    return request(url)
    .then(response => { 
        body = response.body; 
        return mkdirp(path.dirname(filename)); 
    })
    .then(() => writeFile(filename, body))
    .then(() => { 
        console.log(`Downloaded and saved: ${url}`); 
        return body; 
    });
}

function spider(url, callback) {
    const filename = utilities.urlToFileName(url);
    fs.exists(filename, exists => {
        if(!exists) {
            console.log(`Downloading ${url}`);
            require(url, (err, response, body) => {
                if(err){
                    callback(err);
                }else{
                    mkdirp(path.dirname(filename), err => {
                        if(err) {
                            callback(err);
                        }else{
                            fs.writeFile(filename, body, err => {
                                if(err) {
                                    callback(err);
                                }else{
                                    callback(null, filename, true);
                                }
                            });
                        }
                    });
                }
            });
        }else{
            callback(null, filename, false);
        }
    });
}

// function invocation
spider(process.argv[2], 1)
    .then(() => console.log('Download complete')) 
    .catch(err => console.log(err));