/*
  This file is function to load (require) automatically all files in app/routes folder except himself
*/
'use strict'
let fs = require('fs')
let express = require('express')
let jwt             = require('express-jwt')

const ENV = require('../../config/env')[process.env.NODE_ENV || 'development']

module.exports = (passport) => {
    const ROUTER = express.Router();

    // Initialize express JWT
    // It should receive the secretToken (the same one used to generate JWT token in User model)
    let authCheck = jwt({secret: ENV.secretToken, getToken: (req) => {
        // Get Token is a function to tell JWT where our token is stored in users' requests
        // In our app, this token is stored in cookies["blog-token"]
        console.log(req.query)
        console.log(req.cookies["blog-token"])
        return req.cookies["blog-token"]
    }})
    
    // List all files in /app/routes folder
    fs.readdir('./app/routes', (error, files) => {
        if (error)
            throw error
        else
            files.forEach((file) => {
                // remove the file extension
                let route = file.substr(0, file.lastIndexOf('.'));
                // do not require index.js (this file)
                if (route !== 'index') {
                    // require the route with ROUTER like param
                    // Pass authCheck to app' routes, expect for 'auth' routes as these should always be accessible (blocking routes to authenticate by checking authentication should seem weird to everyone :) )
                    if (route === 'auth'){
                        require('./' + route)(ROUTER, passport)    
                    } else {
                        require('./' + route)(ROUTER, authCheck)    
                    }
                }
            })
    })

    return ROUTER

}
