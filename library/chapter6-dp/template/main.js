const JSonConfig = require('./jsonconfig');

const jsonconfig = new JSonConfig();
jsonconfig.read('sample/conf.json');
jsonConfig.set('nodejs', 'design patterns'); 
jsonConfig.save('samples/conf_mod.json');