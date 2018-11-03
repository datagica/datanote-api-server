'use strict'

const runModule = require('@datagica/run-module')

class DatanoteApiServer {

  constructor ({ debug } = {}) {
    this.balancer = runModule({
      bin: 'datanote-api-job-balancer',
      flags: [],
      env: {},
      debug,
    })
    this.runner = runModule({
      bin: 'datanote-api-job-runner',
      flags: [],
      env: {},
      debug,
    })
  }

  async start () {
    await this.balancer.start()
    await this.runner.start()
    console.log('started servers')
  }

  async stop () {
    await this.balancer.stop()
    await this.runner.stop()
    console.log('stopped servers')
  }
}

module.exports = DatanoteApiServer
module.exports.default = DatanoteApiServer
