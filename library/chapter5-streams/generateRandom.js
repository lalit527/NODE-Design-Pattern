const RandomStream = require('./randomstream');
const randomstream = new RandomStream();

randomstream.on('readable', () => {
    let chunk;
    while((chunk = randomstream.read()) !== null) {
        console.log(`Chunk received: ${chunk.toString()}`);
    }   
});