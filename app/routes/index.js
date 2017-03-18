/*
  This file is function to load (require) automatically all files in app/routes folder except himself
*/
'use strict'
let fs = require('fs')
let express = require('express')

module.exports = (passport) => {
    const ROUTER = express.Router();
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
                    require('./' + route)(ROUTER, passport)
                }
            })
    })

    return ROUTER

}
