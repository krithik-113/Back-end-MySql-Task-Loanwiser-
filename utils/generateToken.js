const jwt = require('jsonwebtoken')

const generateToken = (id) => jwt.sign({ id }, "SecretKey")


module.exports = {generateToken}