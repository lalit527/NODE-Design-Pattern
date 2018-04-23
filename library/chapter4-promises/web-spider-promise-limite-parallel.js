const utilities = require('./utilities');
const request = utilities.promisify(require('request')); 
const mkdirp = utilities.promisify(require('mkdirp')); 
const fs = require('fs'); 
const readFile = utilities.promisify(fs.readFile); 
const writeFile = utilities.promisify(fs.writeFile);

function spiderLinks(currentUrl, body, nesting) { 
    if(nesting === 0) { 
        return Promise.resolve(); 
    }
    const links = utilities.getPageLinks(currentUrl, body);
    if(links.length === 0) { 
        return Promise.resolve(); 
    }

    return new Promise((resolve, reject) => {
        let completed = 0;
        let errored = false;
        links.forEach(link => {
            let task = () => {
                return spider(link, nesting - 1)
                    .then(() => {
                        if(++completed === links.length) { 
                            resolve(); 
                        }
                    })
                    .catch(() => { 
                        if (!errored) { 
                            errored = true; 
                            reject(); 
                        } 
                    });
            }
            downloadQueue.pushTask(task);
        });
    });
}