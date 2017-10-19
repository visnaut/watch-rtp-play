/*
 * Copyright (c) 2017, Hugo Freire <hugo@exec.sh>.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

const Request = require('request-on-steroids')

const Promise = require('bluebird')

const Health = require('health-checkup')

class RtpPlayRequest extends Request {
  constructor (options) {
    super(options)

    Health.addCheck('rtp-play', () => Promise.try(() => {
      if (this.circuitBreaker.isOpen()) {
        throw new Error(`circuit breaker is open`)
      }
    }))
  }
}

module.exports = new RtpPlayRequest()
