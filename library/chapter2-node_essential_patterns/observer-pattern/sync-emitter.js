const EventEmitter = require('events').EventEmitter;

class SyncEvent extends EventEmitter {
    constructor() {
        super();
        this.emit('ready');
    }
}
//sync doesn't work
const sync = new SyncEvent();
sync.on('ready', () => console.log('Object is read to be used'));

class ASyncEvent extends EventEmitter {
    constructor() {
        super();
        process.nextTick(() => this.emit('ready'));
    }
}
//Async works
const async = new ASyncEvent();
async.on('ready', () => console.log('Async Object is read to be used'));