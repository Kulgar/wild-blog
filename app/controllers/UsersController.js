'use strict'
let jwt = require('jsonwebtoken')
let Controller = require('./Controller')
let User = require('../models/user')
const ENV = require('../../config/env')[process.env.NODE_ENV || 'development']

class UsersController extends Controller {

    constructor() {
        super(User)
    }

}

module.exports = UsersController
