'use strict'
let UsersController = require('../controllers/UsersController')

module.exports = (app, authCheck) => {
    // Create new controller
    let ctrl = new UsersController();

    // Use authCheck as middleware, it will check JWT token
    // and if JWT is ok, then it will set req.user (by default) in which we will find
    // our payload information
    // If JWT isn't ok, it will send back an unauthorized error and prevent user from accessing this url
    // So, it checks if user is at least logged in (otherwise JWT token shouldn't be set / be right)
    app.get('/users', authCheck, (req, res, next) => {
        console.log("User", req.user)
        return ctrl.find(req, res, next, req.user)
    })

    app.get('/users/:id', authCheck, (req, res, next) => {
        console.log("User", req.user)
        return ctrl.findById(req, res, next, req.user)
    })

    app.post('/users', (req, res, next) => {
        return ctrl.create(req, res, next)
    })

    app.put('/users/:id', (req, res, next) => {
        return ctrl.update(req, res, next)
    })

    app.delete('/users/:id', (req, res, next) => {
      return ctrl.delete(req, res, next)
    })

    app.get('/users/:id/toggle-admin', (req, res, next) => {
      return ctrl.toggleAdmin(req, res, next)
    })
}
