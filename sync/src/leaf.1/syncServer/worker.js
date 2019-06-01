const commandLineArgs = require('command-line-args')

const clog = require('fbkt-clog')
const moment = require('moment')
const Promise = require('bluebird')
const getLeafCreds = require('./getLeafCreds')
const leafSellerViewByStateLocationId = require('../gql/query/leafSellerViewByStateLocationId')
const leafSellerStatus = require('../gql/query/leafSellerStatus')
// const allLfSyncSubscriptions = require('../gql/query/allLfSyncSubscriptions')
const recordSellerSync = require('../gql/mutation/recordSellerSync')
const sendSmsMessageToSubscribers = require('../../common/sendSmsMessageToSubscribers')

const handlers = [
  {
    name: 'mmes',
    handler: require('../sync/mme')
  },
  {
    name: 'strains',
    handler: require('../sync/strains')
  },
  {
    name: 'areas',
    handler: require('../sync/areas')
  },
  {
    name: 'inventoryTypes',
    handler: require('../sync/inventoryTypes')
  },
  {
    name: 'inventories',
    handler: require('../sync/inventories')
  },
  {
    name: 'transfers',
    handler: require('../sync/transfers')
  },
]

function parseError(error) {
  const errStr = error.toString()
  return errStr.indexOf('"error":"Error: ') > -1 ? 
    errStr.split('"error":"Error: ')[1].replace('"}', '') :
    errStr.replace('Error: ', '')
}

async function worker () {
  const optionDefinitions = [
    {name: 'dataset', alias: 'd', type: String},
    {name: 'capture', alias: 'c', type: String},
  ]

  const options = commandLineArgs(optionDefinitions)
  const handlersToExecute = options.dataset ? handlers.filter(h => h.name === options.dataset) : handlers
  const startTime = moment()
  const seller = await leafSellerViewByStateLocationId(process.env.LEAF_MME_CODE)
  const sellerStatus = await leafSellerStatus(seller.id)
  const lastResult = sellerStatus.lfSyncResults.nodes[0] || {
    status: 'ONLINE'
  }
  clog('lastResult', lastResult)

  if (['ONLINE', 'ERROR_500', 'ERROR_ACK', 'RESOLVED'].indexOf(lastResult.status) > -1) {
    return getLeafCreds()
    .then(creds => {
      process.env.LEAF_MME_KEY = creds.mjfKey
      return Promise.reduce(
        handlersToExecute,
        (acc, handler) => {
          return handler.handler(seller)
            .then(result => {
              const endTime = moment()
              const duration = moment.duration(endTime.diff(startTime));

              return Object.assign(acc, {
                endTime: endTime.format(),
                duration: duration.asSeconds(),
                [handler.name]: result
              })
            })

        },
        {
          startTime: startTime.format()
        }
      )
      .then(results => {
        return recordSellerSync(seller.id)
        .then(auditResult => {
          if (auditResult.status === 'RESOLVED') {
            const msg = `LEAF SYNC RESOLVED: ${seller.name}`
            return sendSmsMessageToSubscribers(msg)
              .then(smsResult => {
                return Object.assign({},{
                  results: results,
                  // smsResults: smsResult,
                  auditResult: auditResult
                })  
              })
              .catch(smsError => {
                clog('smsError', smsError)
                throw smsError
              })
          } else {
              return Object.assign({},{
                results: results,
                auditResult: auditResult
              })
            }
          })
        })
        .catch(error => {
            clog('WORKER ERROR', error)
            // const errMsg = parseError(error)
            const msg = `LEAF SYNC ERROR: ${seller.name} -- ${parseError(error)}`
            return sendSmsMessageToSubscribers(msg)
            .then(smsResults => {
              clog('ERROR', error.toString().substring(0,2000))
              return recordSellerSync(seller.id, error.toString().substring(0,2000))
            })
            .then(auditResult => {
              clog('AUDIT RESULT', auditResult)
              if (auditResult.status === 'ERROR') {
                process.exit()
              } else {
                return auditResult
              }
            })
            .catch(error => {
              clog('UNABLE TO RECORD SYNC ERROR', error)
            })
          })
      })
    .catch(error => {
      clog('WORKER ERROR', error)
      process.exit()
    })
  } else {
    clog(`PROCESS IN OFFLINE STATE`, lastResult.status)
    process.exit()
  }
}

module.exports = worker