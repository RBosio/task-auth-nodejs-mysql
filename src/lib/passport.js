const passport = require('passport')
const pool = require('../database')
const LocalStrategy = require('passport-local').Strategy
const { hashPassword, comparePassword } = require('./helpers')

passport.use('local_signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const rows = await pool.query('SELECT * FROM user WHERE email = ?', [email])
  if (rows.length > 0){
    const user = rows[0]
    const verifyPass = await comparePassword(password, user.password)
    if (verifyPass) {
      return done(null, user)
    }
  }
  return done(null, false, req.flash('message', 'Email or password wrong!'))
}))

passport.use('local_signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const { fullname } = req.body
  password = await hashPassword(password)
  const user = {
    email,
    password,
    fullname
  }
  const userDB = await pool.query('SELECT * FROM user WHERE email = ?', [email])
  if (userDB.length == 0){
    const result = await pool.query('INSERT INTO user SET ?', [user])
    user.id = result.insertId
    return done(null, user)
  }
  return done(null, false, req.flash('message', 'That email already exist'))
}))

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const user = await pool.query('SELECT * FROM user WHERE id = ?', [id])
  user[0].password = ''
  done(null, user[0])
})