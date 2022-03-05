module.exports = {
  signupForm: (req, res) => {
    res.render('auth/signup')
  },
  signinForm: (req, res) => {
    res.render('auth/signin')
  },
  logout: (req, res) => {
    req.logOut()
    res.redirect('/')
  }
}