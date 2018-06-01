const http = require('http');
const pid = process.pid;

http.createServer((req, res) => {
  for(let i= 1e7; i>0; i--) {

  }
  console.log(`Handling request from ${pid}`);
  res.end(`Hello request from ${pid}`);
}).listen(process.env.PORT || process.argv[2] || 8080, () => {
  console.log(`Started ${pid}`);
});

/*
starting multiple instance for load balancing
forever start app.js 8081
forever start app.js 8082
forever start app.js 8083
forever start app.js 8084
*/

/**
 * nginx configuration
 http {
  # ...
  upstream nodejs_design_patterns_app {
    server 127.0.0.1:8081;
    server 127.0.0.1:8082;
    server 127.0.0.1:8083;
    server 127.0.0.1:8084; 
  } 
  # ...
  server {
    listen 80;
  location / { 
    proxy_pass http://nodejs_design_patterns_app; 
  }
} 
# ...
}
 */