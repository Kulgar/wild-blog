/*
This file is the entry point
*/
'use strict'
let port = process.env.PORT || 8080
let server = require('./server.js')

server.startServer(port)
