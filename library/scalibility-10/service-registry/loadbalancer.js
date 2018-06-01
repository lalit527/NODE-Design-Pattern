const routing = [
  {
    path: '/api',
    service: 'api-service',
    index: 0
  },
  {
    path: '/',
    service: 'webapp-service',
    index: 0
  }
];

const consul = require('consul')();

const proxy = httpProxy.createProxyServer({});
http.createServer((req, res) => {
  let route;
  routing.some(entry => {
    route = entry;
    return req.url.indexOf(route.path) === 0;
  });

  consul.agent.service.list((err, services) => {
    const severs = [];
    Object.keys(services).filter(id => {
      if (services[id].Tags.indexOf(route.service) > -1) {
        servers.push(`http://${services[id].Address}:${services[id].Port}`)
        }
    });

    if (!servers.length) { 
      res.writeHead(502); 
      return res.end('Bad gateway'); 
    }

    route.index = (route.index + 1) % servers.length; 
    proxy.web(req, res, {target: servers[route.index]});

  });
}).listen(8080, () => console.log('Load balancer started on port 8080'));