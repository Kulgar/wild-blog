'use strict'
let jwt = require('jsonwebtoken')
let Controller = require('./Controller')
let User = require('../models/user')
const ENV = require('../../config/env')[process.env.NODE_ENV || 'development']

class UsersController extends Controller {

    constructor() {
        super(User)
    }

    find(req, res, next, user) {
      // Check if user is an admin, if he is, then he can access /api/users info
      if (user && user.isAdmin) {
        super.find(req, res, next)
      } else {
        return res.status("401").send("Your are not an admin, so not authorized")
      }
    }

    findById(req, res, next, user) {
      // check if accessed user is current user or if current user is an admin
      // Remember, "user" comes from "authCheck" from users routes
      if (user && (user._id === req.params.id || user.isAdmin)) {
        super.findById(req, res, next)
      } else {
        return res.status("401").send("Your are trying to access a private page that doesn't belong to you, so not authorized")
      }
    }

    create(req, res, next) {
        this.model.findOne({
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

    update(req, res, next) {
        // Update a document by request param, this param need to be id with data from body request (req.body)
        this.model.findOneAndUpdate({
            _id: req.params.id
        }, req.body, {new: true}, (err, user) => {
            if (err) {
                next(err)
            } else {
              console.log(user)
              return res.json({token: user.generateJWT()})
            }
        })
    }

    // Toggle isAdmin property of user only if we are in development
    toggleAdmin(req, res, next) {
      if (ENV.env !== "development") {
        res.status("401").send("Your are not in development ENV, so not authorized")
      } else {
        let user = User.find(req.params.id)
        this.model.findById(req.params.id, (err, user) => {
            if (err) {
              return next(err)
            } else {
              user.isAdmin = !user.isAdmin
              user.save(function(err) {
                if(err){ return next(err)}
                console.log("Toggle", user)
                // We must regenerate token as the payload stored in it is used
                // in our app to perform some authorization checks like for /api/users
                // If we don't update blog-token, the payload won't be updated in user's browser cookies, so isAdmin won't be updated when we get it back from authCheck for /api/users
                res.cookie('blog-token', user.generateJWT())
                return res.json(user)
              })
            }
        })
      }
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
