'use strict'
let mongoose = require('mongoose')
let crypto   = require('crypto')
let jwt      = require('jsonwebtoken')
const ENV = require('../../config/env')[process.env.NODE_ENV || 'development']

// What is jwt? 
// JSON Web Tokens are an open, industry standard RFC 7519 method for representing claims securely between two parties.
// In other words, it allows applications to authenticate users with specific role, like 'I claim to be an admin!' => JWT Token sent by this user will allow the application to validate this claim or not thanks to its secret key
// Take a loot at: https://en.wikipedia.org/wiki/JSON_Web_Token#Use
// JWT are used a lot for Single Sign On (like when you log in using your Twitter Account to another website than Twitter)

let userSchema = new mongoose.Schema({
  email: {
    type: String, 
    require: true, 
    unique: true
  },
  name: {
    type: String, 
    require: true
  },
  encryptedPassword: {
    type: String, 
    default: ''
  },
  salt: String,
  facebook: {
    id: String, 
    token: String, 
    photo: String
  },
  bookmarks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post'
  }],
  isAdmin: {
    type: Boolean, 
    default: false
  }
}, {
  timestamps: true
})

// Adding our own methods to userSchema
// That will allow us to use them through the User model

// Encrypt password function
userSchema.methods.setPassword = function(password){
  // Generate random string to set salt
  this.salt = crypto.randomBytes(32).toString('hex')
  // take a look at: https://nodejs.org/api/crypto.html
  // pbkdf2Sync takes 4 parameters: string to encrypt, random salt, number of iterations, key length and optionaly encrypt method
  this.encryptedPassword = crypto.pbkdf2Sync(password, this.salt, 100000, 256, 'sha512').toString('hex')
}

// Validate password function for authentication
userSchema.methods.validPassword = function(password){
  let testedPasswordHash = crypto.pbkdf2Sync(password, this.salt, 100000, 256, 'sha512').toString('hex')
  // Should be true if provided password is the same as encrypted stored password
  return this.encryptedPassword === testedPasswordHash
}

userSchema.methods.generateJWT = function() {
  // Create jwt token and return it
  // First argument of 'sign' will be the shared information by both client and server
  // This is what is called a "Payload", be careful of what you put in there, you never know... :)
  // Second argument is the secret used to sign our token, taken from env.js file
  // Third argument is an options object, you can set the expiration date in there
  // Take a look at: https://www.npmjs.com/package/jsonwebtoken
  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    isAdmin: this.isAdmin,
    bookmarks: this.bookmarks
  }, ENV.secretToken, {
    expiresIn: '7d'
  })
}

module.exports = mongoose.model('User', userSchema)
