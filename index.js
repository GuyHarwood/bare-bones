var port = process.env.PORT || 1337 // let heroku define port or use 1337
var http = require('http') // core node.js http (no frameworks)
var url = require('url') // core node.js url (no frameworks)
var app = require('./app') // auth, token verification & render helpers

http.createServer(function (req, res) {
  var path = url.parse(req.url).pathname
  if (path === '/') {
    app.home(res)
  } else if (path === '/exit') {
    app.exit(res)
  } else {
    app.notFound(res)
  }
}).listen(port)

console.log('Running at: http://127.0.0.1:' + port)
