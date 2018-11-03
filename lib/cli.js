const program = require('commander')
const Server = require('./index')

program
  .version('0.0.0')
  .option('-d, --debug', 'debug mode', true)
  .parse(process.argv)

const main = async () => {

  console.log('[Datanote API Server] starting up nodes..')

  const server = new Server({
    debug: program.debug,
  })

  const quit = async () => {
    await server.stop()
    process.exit(0)
  }

  process.on('exit', quit)
  process.on('SIGINT', quit)

  await server.start()
  
  console.log('[Datanote API Server] ready to process queries')
}

main()