const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const mongodb = require('mongodb')
const rootRouter = require('./routers')
const logger = require('morgan')
const cors = require('cors')
const config = require('config')

const port = process.env.PORT || 8000

mongoose.connect(config.DBHost)
let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))

app.use(bodyParser.json())
app.use(cors())
app.use(logger('dev'))

app.use('/', express.static(__dirname + '/client/build'))

app.use('/api', rootRouter)

app.listen(port)
console.log(`Server listening on port ${port}`)

module.exports = app

// also going to include twitter sentiment either highly positive or negative to influence outlook
