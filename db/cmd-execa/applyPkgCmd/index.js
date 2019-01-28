const execa = require('execa')
const Listr = require('listr')
const Promise = require('bluebird')
const clog = require('fbkt-clog')

function applyPkgCmd (title, pkgArray, cmdTemplate) {
  new Listr([
    {
      title: title,
      task: () => {
        return Promise.mapSeries(
          pkgArray,
          pkg => {
            const cmd = cmdTemplate(pkg)
            clog('COMMAND', cmd)
            return execa.shell(cmd)
              .then(result => {
                clog(`${title} result`, result.stdout)
                // return result
              })
          }
        )
      }
    },
  ]).run()
}

module.exports = applyPkgCmd