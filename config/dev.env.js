var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    serverURI: '"http://localhost:8080"',
    contextPath: '""'
})