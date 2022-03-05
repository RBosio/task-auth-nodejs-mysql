const { format }  = require('timeago.js')

const helpers = {}

helpers.formatTime = (currentTimestamp) => {
  return format(currentTimestamp)
}

module.exports = helpers