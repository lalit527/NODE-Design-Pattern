const request = require('request');

function getPageHtml(url) {
    return new Promise((resolve, reject) => {
        request(url, function(error, response, body) { 
            resolve(body); 
        });
    });
}

/** 
 * Resolving promise with asyn-await
*/
async function main() { 
    const html = await getPageHtml('http://google.com'); 
    console.log(html); 
}

/** 
 * Normal with promise
*/
function main2() { 
    getPageHtml('http://google.com')
                    .then((html) => {
                        console.log(html); 
                    }); 
    
}

main2();