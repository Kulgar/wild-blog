'use strict'
let passport        = require('passport')
let UsersController = require('../controllers/UsersController')

module.exports = (app, passport) => {

    let ctrl = new UsersController()
    let authentication = new AuthenticationController(passport)

    app.post('/auth', authentication.local)

    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: 'email'
    }))

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback', authentication.facebook(passport), (req, res, next) => {
        return ctrl.authenticate(req, res, next)
    })
}
