function logger(name) {
    this.name = name;
}

logger.prototype.log = function(message){
    console.log(`[${this.name}] ${message}`);
}

logger.prototype.info = function(message) {
    this.log(`info: ${message}`);
}

logger.prototype.verbose = function(message) {
    this.log(`verbose: ${message}`);
}

module.exports = logger;