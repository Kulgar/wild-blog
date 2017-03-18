'use strict'

class AuthenticationController {

    constructor() {
    }

    local(req, res, next, passport) {
        console.log(req.body)
        if (!req.body.email || !req.body.password) {
            return res.status(400).send("Please enter your email and password")
        } else {
            // Authenticate user using our "LocalStrategy" in passport.js
            // Second parameter is our own callback so that we can manage error messages
            // the way we want
            return passport.authenticate('local', (err, user, info) => {
                console.log(err)
                console.log(user)
                console.log(info)
                if(err) { next(err) }

                if(user) {
                  res.json({token: user.generateJWT()})
                } else {
                  res.status(401).json(info)
                }
            })(req, res, next)
        }
    }

    facebook(passport) {
        // Authenticate user using our "FacebookStrategy" in passport.js
        return passport.authenticate('facebook')
    }

}

module.exports = AuthenticationController
