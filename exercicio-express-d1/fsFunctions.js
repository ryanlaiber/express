const fs = require('fs/promises');

function readSimpsons() {
  return fs.readFile('./simpsons.json', 'utf-8')
    .then(data => JSON.parse(data));
};

function whriteSimpsons(content) {
  return fs.writeFile('./simpsons.json', JSON.stringify(content));
};

module.exports = {
  readSimpsons,
  whriteSimpsons,
};
