const request = require('request');
const fs = requires('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const utilities = require('./utilities/utilities');
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