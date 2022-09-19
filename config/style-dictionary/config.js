const register = require('ts-node-register')
register({
  target: 'node16',
  project: 'tsconfig.tsnode.json',
})
module.exports = require('./cfg.js')
