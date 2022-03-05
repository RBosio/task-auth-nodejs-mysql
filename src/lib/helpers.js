const bcrypt = require('bcrypt')

module.exports = {
  hashPassword: async (password) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
  },
  comparePassword: (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword)
  },
  dkaop: () => {
    const imagen = document.getElementById('input-photo')
    console.log(imagen)
  }
}