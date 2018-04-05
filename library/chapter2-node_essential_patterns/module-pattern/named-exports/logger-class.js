class Logger {
    constructor(name) {
        this.name = name;
    }

    log(message){
        console.log(`[${this.name}] ${message}`);
    }
    
    info(message) {
        this.log(`info: ${message}`);
    }
    
    verbose(message) {
        this.log(`verbose: ${message}`);
    }
}

module.exports = Logger;

/**Using Guard
 * ES5
  function Logger(name) { 
   if(!(this instanceof Logger)) { 
       return new Logger(name); 
   } 
   this.name = name; 
  };
 * ES6
  function Logger(name) { 
    if(!new.target) { 
        return new LoggerConstructor(name); 
    } 
    this.name = name; 
    }
 */