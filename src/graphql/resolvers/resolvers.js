const { otp } = require('../../services')

const all = () => otp.all()

const active = () => otp.active()

const createOtp = async args => otp.handleOtp(args)

const authenticateOtp = async args => otp.handleAuthenticateOtp(args)

const resendOtp = async args => otp.handleResendOtp(args)

module.exports = {
  all,
  active,
  createOtp,
  authenticateOtp,
  resendOtp,
}
