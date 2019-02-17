const { otp } = require('../../services')

const info = () => 'Hello from Graphql'

const createOtp = async args => otp.handleOtp(args)

const authenticateOtp = async args => otp.handleAuthenticateOtp(args)

const resendOtp = async args => otp.handleResendOtp(args)

module.exports = {
  info,
  createOtp,
  authenticateOtp,
  resendOtp,
}
