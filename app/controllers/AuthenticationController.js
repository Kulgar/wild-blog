'use strict'

class AuthenticationController {

    constructor(passport) {
      this.passport = passport
    }

    local(req, res, next) {
        if (!req.body.email || !req.body.password) {
            res.status(400).send("Please enter your email and password")
        } else {
            // Authenticate user using our "LocalStrategy" in passport.js
            // Second parameter is our own callback so that we can manage error messages
            // the way we want
            passport.authenticate('local', (err, user, info) => {
                if(err) { next(err) }

                if(user) {
                  res.json({token: user.generateJWT()})
                } else {
                  res.status(401).json(info)
                }
            })
        }
    }

    facebook(passport) {
        // Authenticate user using our "FacebookStrategy" in passport.js
        return passport.authenticate('facebook')
    }

}

module.exports = AuthenticationController
