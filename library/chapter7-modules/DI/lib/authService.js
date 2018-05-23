const jwt = require('jwt-simple');
const bcrypt = require('bcrypt');

module.exports = (db, tokenSecret) => {
  const users = db.sublevel('users');
  const authService = {};
  authService.login = (username, password, callback) => {
    //.. same as 
  };

  authService.checkToken = (token, callback) => {
    //.. same as 
  }
  return authService;
}