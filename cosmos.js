var DocumentClient = require('documentdb').DocumentClient

var host = process.env.COSMOS_HOST
var masterKey = process.env.COSMOS_KEY
var client = new DocumentClient(host, {masterKey: masterKey})

var databaseDefinition = { id: process.env.COSMOS_DB_NAME }
var collectionDefinition = { id: process.env.COSMOS_COLLECTION_NAME }
var documentDefinition = { id: 'hello world doc', content: 'Hello World!' }

const lib = {}

lib.insertDocument = (document) => {
  client.createDatabase(databaseDefinition, function (err, database) {
    if (err) return console.log(err)
    console.log('created db')

    client.createCollection(database._self, collectionDefinition, function (err, collection) {
      if (err) return console.log(err)
      console.log('created collection')

      client.createDocument(collection._self, documentDefinition, function (err, document) {
        if (err) return console.log(err)
        console.log('Created Document with content: ', document.content)
      })
    })
  })
}

module.exports = lib
