module.exports.promisify = function(callbackBasedApi) {
    return function promisified() {
        const args = Array.prototype.slice.call(arguments);
        return new Promise((reslove, reject) => {
            args.push((err, result) => {
                if(err) {
                    return reject(err);
                }
                if(arguments.length <= 2) {
                    reslove(result);
                } else {
                    resolve(Array.prototype.slice.call(arguments, 1));
                }
            });
            callbackBasedApi.apply(null, args);
        });
    }
}