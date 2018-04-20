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

function spider(url, nesting, callback) {
    const filename = utilities.urlToFileName(url);
    fs.readFile(filename, 'utf-8', (err, body) => {
        if(err) {
            if(err.code !== 'ENOENT') {
                return callback(err);
            }

            return download(url, filename, (err, body) => {
                if(err) {
                    return callback(err); 
                }
                spiderLinks(url, body, nesting, callback);
            });
        }
        spiderLinks(url, body, nesting, callback);
    });
}

function spiderLinks(currentUrl, body, nesting, callback) {
    if(nesting === 0) {
        return process.nextTick(callback);
    }
    const links = utilities.getPageLinks(currentUrl, body);
    function iterate(index) {
        if(index === links.length) {
            return callback();
        }
        spider(links[index], nesting-1, err => {
            if(err) {
                return callback(err);
            }
            iterate(index + 1);
        });
    }
    iterate(0);
}

// spider('https://google.com', (err, data) => {
//     if(err) {
//         console.log('error');
//     } else {
//         console.log('data');
//     }
// });