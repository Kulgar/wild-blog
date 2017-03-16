'use strict'
// Set up ======================================================================
let http            = require('http')
let express         = require('express')
let bodyParser      = require('body-parser')
let cookieParser    = require('cookie-parser')
let favicon         = require('serve-favicon')
let methodOverride  = require('method-override')
let logger          = require('morgan')
let passport        = require('passport')

// Will automatically load "index.js" from routes folder
let routes          = require('./app/routes')

let app             = express()

const ENV = require('./config/env')[process.env.NODE_ENV || 'development']

require('./config/passport')(passport) // pass passport for configuration

// Set a static folder used by express. This folder contains our Angular application
// Take a look at: expressjs.com/en/starter/static-files.html
console.log(__dirname);
app.use(express.static(__dirname + '/public'));

// Set logs
app.use(logger('combined'));

// https://www.npmjs.com/package/serve-favicon
// Uncomment after placing your favicon in /public:
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))


// Set parser to get the body data request
// ref: https://www.npmjs.com/package/body-parser
app.use(bodyParser.urlencoded({
    'extended': 'true'
}))
app.use(bodyParser.json())
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));

// Set parser for cookies, same logic as bodyParser but for cookies
// Has some extra options, take a look at: https://www.npmjs.com/package/cookie-parser
app.use(cookieParser())

// Override HTTP methods to support DELETE PUT, if client device doesn't support them
app.use(methodOverride('X-HTTP-Method-Override'))

// Initialize passport used by express for authentication
app.use(passport.initialize())

//Load all api routes
//Pass passport to routes module in app/routes/index.js
app.use('/api', routes(passport))

// Connect to mongodb
let mongoose = require('mongoose')
mongoose.connect(ENV.db);

// Catch 404 not found errors and forward to error handler
app.use((request, response, next) => {
  let err = new Error('Not Found')
  console.log("Were here")
  err.status = 404
  next(err)
})

// To better understand middlewares: 
// http://expressjs.com/en/guide/writing-middleware.html
// Middleware to catch all errors
app.use((error, request, response, next) => {
  console.error(error.stack)
  console.log("Were also here")
  response.status(error.status || 500).send(error.message)
})

//Export function startServer with port, path and callback params it's used by brunch
// brunch? -> https://www.npmjs.com/package/brunch
// Brunch is not used here but it is good to know it
exports.startServer = (port, path, callback) => {
    // Create server
    let server = http.Server(app);
    // Listening
    port = process.env.PORT || port
    server.listen(port, callback)
    console.log(`server listening on port ${port}`)

    //Intercept when application killed
    process.on('SIGINT', function() {
        console.log("\nStopping...")
        process.exit()
    });
}
