const clog = require('fbkt-clog')
const Promise = require('bluebird')
// Twilio Credentials 
const accountSid = 'AC90f525b0e3b628c3fd88557685693497'
const authToken = '413ad1b7a68091a87bd24305d40bd222'
const fromPhoneNumber = "+12062029333"

//require the Twilio module and create a REST client 
const client = require('twilio')(accountSid, authToken)


async function sendSmsMessage(options){
  const d = Promise.defer()

  const toPhoneNumber = options.toPhoneNumber[0] === '1' ? options.toPhoneNumber : ['1', options.toPhoneNumber].join('')

  const smsOptions = {
    to: toPhoneNumber,
    from: fromPhoneNumber,
    body: options.message,
  }

  client.messages.create(smsOptions, function (err, message) {
    if (err) {
      d.reject(err)
    } else {
      d.resolve(message)
    }
  })

  return d.promise
}

module.exports = sendSmsMessage