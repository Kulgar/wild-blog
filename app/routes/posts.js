/*
This file define all routes (API RESTFull) for posts
*/
'use strict'
// Require controller used to communicate with database
let PostsController = require('../controllers/PostsController')

module.exports = (app) => {
    // Create new controller
    let ctrl = new PostsController();

    //GET (for READ)  method
    app.get('/posts', (req, res, next) => {
        return ctrl.find(req, res, next)
    })

    //GET (for READ) method with request params id
    app.get('/posts/:id', (req, res, next) => {
        return ctrl.findById(req, res, next)
    })

    //POST (for CREATE) method
    app.post('/posts', (req, res, next) => {
        return ctrl.create(req, res, next)
    })

    //PUT (for UPDATE) method with request params id
    app.put('/posts/:id', (req, res, next) => {
        return ctrl.update(req, res, next)
    })

    //DELETE (for DELETE) method with request params id
    app.delete('/posts/:id', (req, res, next) => {
        return ctrl.delete(req, res, next)
    })

}
