'use strict';
const clog = require('fbkt-clog');
const expect = require('chai').expect;

const target = require('./index');

describe('sendSmsMessage', function () {

  it.only('should send an SMS message', function (done) {
    const options = {
      message: 'this is a mu-fu-in test',
      toPhoneNumber: "2066606219",  // kevin
      // toPhoneNumber: "2066835323",   // jerry
      // toPhoneNumber: "2062270978",   // glenn
    }

    target(options)
      .then(result => {
        clog('FINAL RESULT', result);
        done();
      })
      .catch(error => {
        done(error);
      })
  });

});
