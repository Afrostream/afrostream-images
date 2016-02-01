'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var http = require('http')
  , httpProxy = require('http-proxy');

var config = require('../config');
var target = config.imgix.protocol + '://' + config.imgix.host;


var proxy = httpProxy.createProxyServer({});
proxy.on('proxyReq', function(proxyReq, req, res, options) {
  proxyReq.setHeader('Host', config.imgix.host);
});

var server = http.createServer(function(req, res) {
  proxy.web(req, res, { target: target });
});

server.listen(config.port);