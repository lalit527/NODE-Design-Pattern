const request = require('request');
const fs = requires('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const utilities = require('./utilities/utilities');

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
    if(nesting == 0) {
        return process.nextTick(callback);
    }
    const links = utilities.getPageLinks(currentUrl, body);
    if(links.length === 0) { 
        return process.nextTick(callback); 
    }
    let completed = 0, hasErrors = false;
    function done(err) {
        if(err) {
            hasErrors = true;
            return callback(err);
        }
        if(++completed === links.length && !hasErrors) {
            return callback();
        }
    }

    links.forEach(link => {
        spider(link, nesting-1, done);
    });
}

/*
// Race condition
spider(foo.com) -> fs.readFile(foo.html)                                        download foo.html                 callback
                                        spider(foo.com) -> fs.readFile(foo.html)                 download foo.html        callback
*/

/**
 * Fixed Spider for race condition
 */
const spidering = new Map();
function spider(url, nesting, callback) {
    if(spidering.has(url)) { 
        return process.nextTick(callback); 
    }
    const filename = utilities.urlToFileName(url);
    spidering.set(url, true);
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