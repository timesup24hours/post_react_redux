// import dotenv from 'dotenv';
// dotenv.config(); // LOAD CONFIG
console.log(process.env.NODE_ENV)

import express from 'express'

import { logger } from './utils'

import morgan from 'morgan'

import cors from 'cors' // cors domain request

import mongoose from 'mongoose'

import { config, auth as authConfig } from '../config'

// var redis = require('redis')
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import session from 'express-session'
// var RedisStore = require('connect-redis')(session)
const MongoStore = require('connect-mongo')(session)

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)

import passportConfig from './passport/'
import passport from 'passport'

import router from './routes'

const chatController = require('./controllers/chat')

// Log requests to console
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'))

// var PORT = process.env.PORT || 4000
app.set('port', (process.env.PORT || config.PORT))


mongoose.Promise = require('bluebird')
const db = mongoose.connection
db.on('error', console.error)
db.once('open', () => {
    console.log('Connected to mongod server')
})
mongoose.connect(config.mongodbUrl)

// setup CORS
const allowCrossDomain = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE")
    res.header("Access-Control-Allow-Headers", "Content-Type")
    res.header("Access-Control-Allow-Credentials", "true")
    next()
}
app.use(cors())
app.use(allowCrossDomain)


// setup logging
// app.use(morgan('combined', {stream: logger.stream}))

// add body parsing
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// add cookie parsing
app.use(cookieParser(authConfig.sessionSecret))

// add session support
// 此时req对象还没有session这个属性
app.use(session({
    secret: authConfig.sessionSecret,
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 1 * 24 * 60 * 60
    })
}))
// app.use(session({
//   store: new RedisStore({
//      host: config.redisHost,
//      port: config.redisPort,
//      ttl: 60 * 60 * 24 * 30,   //Session的有效期为30天
//   }),
//   secret: config.sessionSecret,
//   saveUninitialized: true,
//   resave: true,
//   })
// )

// add passport.js
app.use(passport.initialize())
app.use(passport.session())
passportConfig(app)

// server static files
app.use(express.static(config.ROOT + '/build'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs')

// setup routers
app.use('/api', router)

// setup socket io
chatController.initChatSockets(io)

// catch all unhandled errors
app.use((err, req, res, next) => {
  logger.error('unhandled application error: ', err);
  res.status(500).send(err);
});

app.get('/*', function(req, res) {
  res.sendFile(config.ROOT + '/build/index.html')
})

// listen to port
server.listen(app.get('port'), function() {
  console.log('Express server is up on port ' + server.address().port)
})

// output all uncaught exceptions
process.on('uncaughtException', err => logger.error('uncaught exception:', err));
process.on('unhandledRejection', error => logger.error('unhandled rejection:', error));
