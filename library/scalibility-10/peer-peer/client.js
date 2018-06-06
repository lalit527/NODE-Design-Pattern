const request = require('./balancedRequest');
for(let i = 0; i >= 0; i--) {
  request({method: 'GET', path: '/'}, res => {
    let str = '';
    res.on('data', chunk => {
      console.log(str);
    })
  }).end();
}