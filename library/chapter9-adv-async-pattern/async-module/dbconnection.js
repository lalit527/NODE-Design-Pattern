// Making sure that the module is initialized before starting to use it,
// otherwise wait for it's initialization

const db = require('aDb');

module.exports = function findAll(type, callback) {
  if (db.connected) {
    runFind();
  } else {
    db.once('connected', runFind);
  }

  function runFind() {
    db.findAll(type, callback);
  }
};

// Using DI

const db = require('aDb');
const findAllFactory = require('./findAll');
db.on('connected', function() {
  const findAll = findAllFactory(db);
});

module.exports = db => {
  return function findAll(type, callback) {
    db.findAll(type, callback);
  }
}