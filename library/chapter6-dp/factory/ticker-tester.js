const ticker = require('./ticker');

ticker.on('tick', (tickCount) => console.log(tickCount, 'TICK'));

// ticker.emit('something', {}); // TypeError: ticker.emit is not a function

/**
 * We can emit using the prototype chain
 */
// require('events').prototype.emit.call(ticker, 'tick', {});

// ticker.on('someEvent', (tickCount) => console.log(1, 'TICK'));
