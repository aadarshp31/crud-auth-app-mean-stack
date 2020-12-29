import mongo from 'mongodb'
const { MongoClient } = mongo
const url = 'mongodb://localhost:27017/sample'
const db = 'sample'
let database
let collection

const getConnection = (dbName, collectionName) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    if (err) console.error(err)
    console.log('Database connected!')
    database = client.db(dbName)
    collection = database.collection(collectionName)
  })
}

export { database, collection, getConnection }
