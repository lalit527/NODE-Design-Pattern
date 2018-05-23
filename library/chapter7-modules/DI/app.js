// Factory Injection DI
const authServiceFactory = require('./lib/authService'); 
const authControllerFactory = require('./lib/authController');

const db = dbFactory('example-db'); 
const authService = authServiceFactory(db, 'SHHH!'); 
const authController = authControllerFactory(authService);

app.post('/login', authController.login); 
app.get('/checkToken', authController.checkToken);

//Constructor Injection DI
const service = new Service(dependencyA, dependencyB);

//Property Injection DI
const service = new Service(); //works also with a factory 
service.dependencyA = anInstanceOfDependencyA;