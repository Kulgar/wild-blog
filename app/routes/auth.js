'use strict'

module.exports = (app, passport) => {

    app.post('/auth', (req, res, next) => {
        console.log("Authenticate")
        return res.json({login: 'hello'})
    })

}
