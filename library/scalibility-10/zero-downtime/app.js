const http = require('http');
const pid = process.pid;

http.createServer((req, res) => {
  console.log(`Handling request from ${pid}`);
  res.end(`Hello request from ${pid}`);
}).listen(8080, () => {
  console.log(`Started ${pid}`);
})


setTimeout(() => { 
  throw new Error('Ooops'); 
}, Math.ceil(Math.random() * 3) * 1000);
