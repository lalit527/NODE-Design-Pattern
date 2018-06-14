const WebSocketServer = require('ws').Server;
const args = require('minimist')(process.argv.slice(2));
const zmq = require('zmq');
const pubSocket = zmq.socket('sub');
pubSocket.bind(`tcp://127.0.0.1:${args['pub']}`);

const subSocket = zmq.socket('sub');
const subPort = [].concat(args['sub']);

subPort.forEach(p => {
  console.log(`Subscribing to ${p}`);
  subSocket.connect(`tcp://127.0.0.1:${p}`);
});
subSocket.subscribe('chat');

const server = require('http').createServer(
  require('ecstatic')({root: `${__dirname}/www`})
);

const wss = new WebSocketServer({server: server});

wss.on('connection', ws => {
  console.log('Client connected');
  ws.on('message', msg => {
    console.log(`Message: ${msg}`);
    // broadcast(msg);
    broadcast(msg);
    pubSocket.send(`chat ${msg}`);
  });
});

subSocket.on('Message', (msg) => {
  console.log(`From other server: ${msg}`);
  broadcast(msg.toString().split(' ')[1]);
});
// function broadcast(msg) {
//   wss.clients.forEach(client => {
//     client.send(msg);
//   });
// }

server.listen(argv['http'] || 8080);