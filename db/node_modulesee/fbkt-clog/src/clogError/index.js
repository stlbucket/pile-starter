const clog = require('../clog');

module.exports = function (sectionIdentifier, logItem, exitProcess) {
  if (exitProcess) {
    clog(sectionIdentifier, logItem, 'yellow');
    process.exit();
  } else {
    return clog(sectionIdentifier, logItem, 'yellow');
  }
}