'use strict'
let jwt = require('jsonwebtoken')
let Controller = require('./Controller')
let User = require('../models/user')
const ENV = require('../../config/env')[process.env.NODE_ENV || 'development']

class UsersController extends Controller {

    constructor() {
        super(User)
    }

    create(req, res, next) {
        User.findOne({
            email: req.body.email
        }, function(err, user) {
            console.log(user)
            if(!req.body.email) {
                return res.status(400).send("Email should be provided / invalid format");
            } else if(user) {
                // Don't create user if a user already exists in DB with same email
                return res.status(403).send("Email already taken");
            } else {
                let user = new User(req.body)
                console.log(user)
                user.setPassword(req.body.password)
                user.save(function (err) {
                    if(err){ return next(err) }
                    return res.json({token: user.generateJWT()})
                })
            }
        })
    }


    authenticate(req, res, next) {
        if (req.user) {
            console.log(req.user)
            let user = new User(req.user)
            let token = user.generateJWT()

            res.redirect("/#!/auth/callback/" + token);
        } else {
            res.send(401);
        }

    }

}

module.exports = UsersController
