function urlToFilename(url) {
    if (url) {
       var m = url.toString().match(/.*\/(.+?)\./);
       if (m && m.length > 1) {
          return m[1];
       }
    }
    return "";
}

function getPageLinks() {

}

module.exports  = {
    urlToFilename,
    getPageLinks
}