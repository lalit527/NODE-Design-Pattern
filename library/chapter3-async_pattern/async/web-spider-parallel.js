const async = require('async');
const q = async.queue(worker, concurrency);

const downloadQueue = async.queue((taskData, callback) => { 
    spider(taskData.link, taskData.nesting - 1, callback); 
}, 2);

function spiderLinks(currentUrl, body, nesting, callback) { 
    if(nesting === 0) { 
        return process.nextTick(callback); 
    }
    const links = utilities.getPageLinks(currentUrl, body); 
    if(links.length === 0) { 
        return process.nextTick(callback); 
    }
    let completed = 0, hasErrors = false; 
    links.forEach(link => { 
        downloadQueue.pushTask(done => { 
            spider(link, nesting - 1, err => { 
                if(err) { 
                    hasErrors= true; 
                    return callback(err); 
                } 
                if(++completed === links.length && !hasErrors) { 
                    callback(); 
                } 
                done(); 
            }); 
        }); 
    });
}
