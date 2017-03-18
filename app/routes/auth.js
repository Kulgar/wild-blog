'use strict'
let UsersController = require('../controllers/UsersController')
let AuthenticationController = require('../controllers/AuthenticationController')

module.exports = (app, passport) => {

    let ctrl = new UsersController()
    let authentication = new AuthenticationController(passport)

    app.post('/auth', (req, res, next) => {
      return authentication.local(req, res, next, passport)
    })

    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: 'email'
    }))

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback', authentication.facebook(passport), (req, res, next) => {
        return ctrl.authenticate(req, res, next)
    })
}
