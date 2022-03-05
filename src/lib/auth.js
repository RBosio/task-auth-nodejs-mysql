module.exports = {
  isAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/')
  },
  isUnauthenticated: (req, res, next) => {
    if (req.isUnauthenticated()) {
      return next()
    }
    res.redirect('/profile')
  }
}