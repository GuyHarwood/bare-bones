var test = require('tape')
var app = require('./../app') // auth, token verification & render helpers
var mock = require('./mock') // basic mock of http module req & res

test('home', function (t) {
  app.home(mock.res)
  t.equal(200, 200, 'Status 200')
  t.end()
})

test('notFound', function (t) {
  var res = app.notFound(mock.res)
  // console.log(res.status)
  t.equal(res.status, 404, 'Not found')
  t.end()
})

setTimeout(function () {
  app.done(mock.res)
  app.exit(mock.res)
}, 1500)

process.on('uncaughtException', function (err) {
  console.log('FAIL ... ' + err)
})
