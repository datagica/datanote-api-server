'use strict'

const micro = require('micro')
const file2doc = require('@datagica/datanote-service-file2doc')

class DatanoteApiServer {
  errors = []
  constructor (opts) {
    this.file2doc = micro(file2doc.buildApi({
      rateLimitSize: 50,
      rateLimitWindow: 60000,
      maxFileSize: '1mb',
      maxTypes: 5,
    }))
  }
  async start ({ port } = { port: 3000 }) {
    return new Promise((resolve, reject) => {
      this.file2doc.listen(port, () => {
        resolve(true)
      })
    })
  }

  async stop () {
    return new Promise((resolve, reject) => {
      this.file2doc.close(wasNotRunning => {
        // note: we don't care if it wasn't already running.. we just want to exit
        resolve(true)
      })
    })
  }
}

module.exports = DatanoteApiServer
module.exports.default = DatanoteApiServer
