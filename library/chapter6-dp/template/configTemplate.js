const fs = require('fs');
const objectPath= require('object-path');

class ConfigTemplate {
  read(file) {
    console.log(`Deserializing from ${file}`); 
    this.data = this._deserialize(fs.readFileSync(file, 'utf-8'));
  }
}