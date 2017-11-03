var test = require('tape')
var request = require('request')
var host = 'http://127.0.0.1:'
var port = Math.floor(Math.random() * 9000) + 1000

process.env.PORT = port
// var server = require('../server')

var exec = require('child_process').exec
exec('node ./index.js', function (error, stdout, stderr) {
  // console.log(stdout)             // uncomment for console.log
  // console.log('stderr: ', stderr) // uncomment for errors
  if (error !== null) {
    console.log('exec error: ', error)
  }
})

setTimeout(function () {
  // only run tests once child_process has started
  test('Connect to localhost ' + host + ':' + port, function (t) {
    request(host + port, function (err, res, body) {
      // console.log(err)
      // t.equal(err, null, "No Errors Connecting")
      // console.log(res)
      t.equal(res.statusCode, 200, 'Status 200')
      t.end()
    })
  })

  test('EXIT ' + host + port + '/exit', function (t) {
    request(host + port + '/exit', function (err, res, body) {
      t.equal(body, 'bye', 'Exit server')
      t.equal(res.statusCode, 404, 'End tests!')
      t.end()
    })
  })
}, 442) // give the server time to start

process.on('uncaughtException', function (err) {
  console.log('FAIL ... ' + err)
})
