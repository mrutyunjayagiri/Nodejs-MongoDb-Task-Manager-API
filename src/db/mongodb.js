
const { MongoClient, ObjectID } = require('mongodb')


const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'Task-Manager'

const id = new ObjectID()
console.log(id)
console.log(id.getTimestamp())

MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database')
    }
    console.log('Connected to MongoDb Successfully')
    const db = client.db(databaseName)
    // db.collection('users').findOne({_id: new ObjectID('5e997a7f48b33e206842dcf5')},(error, result) => {
    //     if (error) {
    //         return console.log("Unable to Fetch")
    //     }
    //     console.log(result)

    // })
    // db.collection('users').updateOne({
    //     _id: new ObjectID('5e997a7f48b33e206842dcf5')
    // }, {
    //     $inc: {
    //         age: 5
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // db.collection('tasks').updateMany({
    //     completed: false
    // }, {
    //     $set: {
    //         completed: true
    //     }
    //  }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })
    db.collection('users').deleteMany({
        age: 25
    
     }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
})