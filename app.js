const upSince = new Date().toString()
const cosmos = require('./cosmos')

function home (req, res) {
  if (req.method !== 'GET') return unsupported(res)
  res.writeHead(200, {'content-type': 'application/json'})
  return res.end(upSince)
}

function docCount (req, res) {
  if (req.method !== 'GET') return unsupported(res)
  const count = '20' // cosmos.getDocumentCount()
  writeHead(res, 200)
  return res.end(count)
}

async function postDoc (req, res) {
  if (req.method !== 'POST') return unsupported(res)
  try {
    await cosmos.insertDocument(req.body)
    writeHead(res, 201)
    return res.end()
  } catch (error) {
    writeHead(res, 500)
    res.end(error.message ? error.message : 'unknown error')
  }
}

const writeHead = (res, statusCode) => {
  res.writeHead(statusCode, {'content-type': 'application/json'})
}

function unsupported (res) {
  res.writeHead(405, {'content-type': 'application/json'})
  return res.end('Method Not Allowed')
}

function notFound (res) {
  res.writeHead(404, {'content-type': 'application/json'})
  return res.end()
}

function exit (res) {
  if (process.env.NODE_ENV === 'production') return
  res.writeHead(404, {'content-type': 'application/json'})
  res.end('bye')
  process.exit() // kill the server!
}

function done (res) {
  // does nothing. (pass as callback)
}

module.exports = {
  exit: exit,
  done: done, // moch callback
  home: home,
  notFound: notFound,
  docCount: docCount,
  postDoc: postDoc
}
