'use strict'

const balancer = require('@datagica/datanote-api-job-balancer')
const runner = require('@datagica/datanote-api-job-runner')
const micro = require('@datagica/micro-wrapper')

class DatanoteApiServer {

  defaultParallelism = 2 // TODO use number of cores?

  constructor ({ parallelism } = {}) {

    this.balancer = micro({
      moduleName: '@datagica/datanote-api-job-balancer',
    })
    this.runner = micro({
      moduleName: '@datagica/datanote-api-job-balancer',
    })
  }

  async start () {
    await this.runner.preload()
    await this.microBalancer.start()
    await this.microRunner.start()
  }

  async stop () {
    await this.microBalancer.stop()
    await this.microRunner.stop()
  }
}

module.exports = DatanoteApiServer
module.exports.default = DatanoteApiServer
