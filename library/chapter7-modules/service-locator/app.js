const svcLoc = require('./lib/serviceLocator')();

svcLoc.register('dbName', 'example-db'); 
svcLoc.register('tokenSecret', 'SHHH!'); 
svcLoc.factory('db', require('./lib/db')); 
svcLoc.factory('authService', require('./lib/authService')); 
svcLoc.factory('authController', require('./lib/authController'));

const authController = svcLoc.get('authController');

app.post('/login', authController.login); 
app.all('/checkToken', authController.checkToken);