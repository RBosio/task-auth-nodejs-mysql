const pool = require("../database")

module.exports = {
  main: (req, res) => {
    res.render('index')
  },
  profile: (req, res) => {
    res.render('profile/profile')
  },
  upload: async (req, res) => {
    await pool.query('UPDATE user SET image = ? WHERE id = ?', [req.file.filename, req.user.id])
    req.flash('success', 'image uploaded successfully')
    res.redirect('/profile')
  }
}