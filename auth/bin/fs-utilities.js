const fs = require('fs')

module.exports.write = function(data) {
    fs.writeFile('./bin/data.json', JSON.stringify(data))
}