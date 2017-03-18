'use strict'
let FacebookStrategy  = require('passport-facebook').Strategy
let LocalStrategy     = require('passport-local').Strategy
let User              = require('../app/models/user');
const ENV             = require('./env')[process.env.NODE_ENV || 'development']

// We can get 'passport' argument from server.js thanks to this line:
// require('./config/passport')(passport)
module.exports = (passport) => {

  // Take a look at: http://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
  // used to serialize the user for the request session
  // We are using id here, but we could use any "unique" information like "email"
  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })

  // used to deserialize user from the request session:
  passport.deserializeUser(function(id, done){
    // Retrieve user from the session
    USER.findById(id, function(err, user){
      done(err, user)
    })
  })

  // =========================================================================
  // Local Strategy ==========================================================
  // =========================================================================
  passport.use(new LocalStrategy({
    usernameField: 'email'
  }, (email, password, done) => {
    // Ensure that this will be executed asynchronously
    // take a look at: https://howtonode.org/understanding-process-next-tick
    // and https://www.sitepoint.com/local-authentication-using-passport-node-js/
    // and https://www.sitepoint.com/passport-authentication-for-nodejs-applications/
    console.log("pouette")
    process.nextTick(function(){
      console.log(email)
      console.log(password)
      User.findOne({email: email}, function(err, user){
        if (err) { return done(err) }
        if (!user) {
          return done(null, false, {message: 'Incorrect email/password.'})
        }

        // We are checking if password is the same as the one stored and encrypted in db
        if (!user.validPassword(password)) {
          return done(null, false, {message: 'Incorrect email/password.'})
        }
        return done(null, user);
      })
    })
  }))

  // =========================================================================
  // FACEBOOK ================================================================
  // =========================================================================
  // Initialize FacebookStrategy
  passport.use(new FacebookStrategy({
      clientID: ENV.facebookAuth.clientID,
      clientSecret: ENV.facebookAuth.clientSecret,
      callbackURL: ENV.facebookAuth.callbackURL,
      profileFields: ['id', 'name', 'photos', 'emails']
  }, (token, refreshToken, profile, done) => {
    // Ensure that this will be executed asynchronously
    // and https://www.sitepoint.com/passport-authentication-for-nodejs-applications/
    process.nextTick(function() {
      // Retrieve User or create a new one if none was found
      // Use facebook id as unique key to retrieve user
      // Documentation: https://github.com/jaredhanson/passport-facebook
      User.findOne({
          'facebook.id': profile.id
      }, (err, user) => {

        if (err)
          return done(err);

        if (user) {
          return done(null, user)
        } else {
          let newUser = new User()

          newUser.facebook.id = profile.id
          newUser.facebook.token = token
          newUser.name = profile.name.givenName + ' ' + profile.name.familyName
          newUser.email = profile.emails[0].value || ''
          newUser.facebook.photo = profile.photos[0].value || ''

          newUser.save((err) => {
            if (err)
              throw err;
            return done(null, newUser);
          })
        }

      })
    })

  }))

}
