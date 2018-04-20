const async = require('async');

function download(url, filename, callback) {
    console.log(`Downloading ${url}`); 
    let body;

    async.series([
        callback => {
            request(url, (err, response, resBody) => {
                if(err) {
                    return callback(err);
                }
                body = resBody;
                callback();
            });
        },

        mkdirp.bind(null, path.dirname(filename)),

        callback => { 
            fs.writeFile(filename, body, callback); 
        }
    ], err => {
        if(err) {
            return callback(err);
        }
        console.log(`Downloaded and saved ${url}`); 
        callback(null, body);
    });
}

function spiderLinks(currentUrl, body, nesting, callback) { 
    if(nesting === 0) { 
        return process.nextTick(callback); 
    }
    const links = utilities.getPageLinks(currentUrl, body); 
    if(links.length === 0) { 
        return process.nextTick(callback); 
    }
    async.eachSeries(links, (link, callback) => { 
        spider(link, nesting - 1, callback); 
    }, callback);

}