const router = require('express').Router()
const { main, profile, upload } = require('../controllers')
const { isAuthenticated } = require('../lib/auth')
const multer = require('../lib/multer')

router.route('/')
  .get(main)

router.route('/profile')
  .get(isAuthenticated, profile)

router.route('/upload')
  .post(isAuthenticated, multer.single('image'), upload)

module.exports = router