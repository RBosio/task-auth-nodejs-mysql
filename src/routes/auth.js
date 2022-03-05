const router = require('express').Router()
const passport = require('passport')
const { signupForm, signinForm, logout } = require('../controllers/auth')
const { isAuthenticated, isUnauthenticated } = require('../lib/auth')

router.route('/signup')
  .get(isUnauthenticated, signupForm)
  .post(isUnauthenticated, passport.authenticate('local_signup', {
    successRedirect: '/profile',
    failureRedirect: '/auth/signup',
    failureFlash: true
  }))

router.route('/signin')
  .get(isUnauthenticated, signinForm)
  .post(isUnauthenticated, passport.authenticate('local_signin', {
    successRedirect: '/profile',
    failureRedirect: '/auth/signin',
    failureFlash: true
  }))

router.route('/logout')
  .get(isAuthenticated, logout)

module.exports = router