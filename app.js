function exit (res) {
  res.writeHead(404, {'content-type': 'text/plain'})
  res.end('bye')
  process.exit() // kill the server!
}

function notFound (res) {
  res.writeHead(404, {'content-type': 'text/plain'})
  return res.end('Not Found')
}

function home (res) {
  res.writeHead(200, {'content-type': 'application/json'})
  return res.end()
}

function done (res) {
  // does nothing. (pass as callback)
}

module.exports = {
  exit: exit,
  done: done, // moch callback
  home: home,
  notFound: notFound
}
