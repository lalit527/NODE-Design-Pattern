/**
 * reading data in non-flow mode
 */
process.stdin
    .on('redable', () => {
        let chunk;
        console.log('New Data available');
        while((chunk = process.stdin.read()) != null) {
            console.log(`Chunk read: (${chunk.length}) "${chunk.toString()}"`);
        }
    })
    .on('end', () => process.stdout.write('End of stream'));

/**
 * reading data in flow mode
 */
process.stdin
    .on('data', chunk => {
        console.log('New Data available');
        console.log(`Chunk read: (${chunk.length}) "${chunk.toString()}"`);
    })
    .on('end', () => process.stdout.write('End of stream'));