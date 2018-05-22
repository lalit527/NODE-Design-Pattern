const zmq = require('zmq'); 
const ZmqMiddlewareManager = require('./zmqmiddlewaremanager'); 
const jsonMiddleware = require('./jsonmiddleware'); 
const request = zmq.socket('req'); 
request.connect('tcp://127.0.0.1:5000');

zmqm.use({ 
  inbound: function (message, next) { 
    console.log('Echoed back: ', message.data); 
    next(); 
  } 
});