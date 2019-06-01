const clog = require('fbkt-clog')
const mme = require('./index')

async function syncItAll(){
  const options = {
    writeToFile: false
  }

  const mmeResults = await mme(options)
  clog('mme', mmeResults.reduce(
    (acc, result) => {
      return Object.assign(acc, {
        [result]: (acc[result] || 0) + 1
      })
    }, {}
  ))

}

syncItAll()
  .catch(e => {
    clog.error('ERROR ',e)
    process.exit()
  })
