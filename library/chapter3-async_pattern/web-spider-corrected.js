const request = require('request');
const fs = requires('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const utilities = require('./utilities/utilities');
function saveFile(filename, contents, callback) { 
    mkdirp(path.dirname(filename), err => { 
        if(err) { 
            return callback(err); 
        } 
        fs.writeFile(filename, contents, callback); 
    }); 
}

function download(url, filename, callback) { 
    console.log(`Downloading ${url}`); 
    request(url, (err, response, body) => { 
        if(err) { 
            return callback(err); 
        }
        saveFile(filename, body, err => { 
            if(err) { 
                return callback(err); 
            } 
            console.log(`Downloaded and saved: ${url}`); 
            callback(null, body); 
        }); 
    });
}

function spider(url, callback) {
    const filename = utilities.urlToFileName(url);
    fs.exists(filename, exists => {
        if(exists) {
            return callback(null, filename, false);
        }
        download(url, filename, err => {
            if(err) {
                return callback(err);
            }
            callback(null, filename, true);
        });
    });
}

spider('https://google.com', (err, data) => {
    if(err) {
        console.log('error');
    } else {
        console.log('data');
    }
});