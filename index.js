const port = process.env.PORT || 4000
const http = require('http') // core node.js http (no frameworks)
const url = require('url') // core node.js url (no frameworks)
const app = require('./app') // auth, token verification & render helpers

http.createServer(function (req, res) {
  var path = url.parse(req.url).pathname
  console.log('path is:', path)
  if (path === '/') {
    app.home(req, res)
  } else if (path === '/docs') {
    app.docCount(req, res)
  } else if (path === '/exit') {
    app.exit(res)
  } else {
    app.notFound(res)
  }
}).listen(port)

console.log('Running at: http://127.0.0.1:' + port)
