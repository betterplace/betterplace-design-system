const register = require('ts-node-register')
register({
  target: 'node16',
})
module.exports = require('./main.ts')
