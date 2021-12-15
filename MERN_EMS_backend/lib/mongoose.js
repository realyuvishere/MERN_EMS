require('dotenv').config()
const mongoose = require('mongoose')
let url = process.env.MONGODB_URL

const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(url, mongooseOptions, (error, client) => {
    if (error) {
        return console.log('Unable to connect through mongoose: ', error)
    }
    console.log('Connected to mongoose')
})

module.exports = mongoose