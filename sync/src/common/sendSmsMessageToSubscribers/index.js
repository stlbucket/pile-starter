const clog = require('fbkt-clog')
const Promise = require('bluebird')
const sendSmsMessage = require('../sendSmsMessage')
const allLfSyncSubscriptions = require('../../leaf/gql/query/allLfSyncSubscriptions')

async function sendSmsMessageToSubscribers(msg){
  const subscriptions = await allLfSyncSubscriptions()

  return Promise.mapSeries(
    subscriptions,
    subscription => {
      // clog('sending', toNumber)
      if (subscription.enabled === true) {

        return sendSmsMessage({
          toPhoneNumber: subscription.phoneNumber
          ,message: msg
        })
        .catch(smsError => {
          clog('smsError', smsError)
          throw smsError
        })
      } else {
        return `${subscription.name} subscription not enabled`
      }
  })
}

module.exports = sendSmsMessageToSubscribers