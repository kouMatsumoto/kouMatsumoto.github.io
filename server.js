/**
 * Server used in development with Hot Module Replacement
 */

const httpServer = require('http-server');

const server = httpServer.createServer({
  root: './',
  cache: -1,
  robots: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true'
  }
});

require('chokidar-socket-emitter')({app: server.server});

server.listen(9089);