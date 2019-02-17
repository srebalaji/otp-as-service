const {
  handleOtpService,
  handleAuthenticateService,
} = require('../helpers')

const handleOtp = (args) => {
  if (args.otp.source) return handleOtpService.buildRelevantOtp(args)
  throw new Error('No source provided.')
}


const handleAuthenticateOtp = (args) => {
  if (args.otp.source && args.otp.otp) {
    return handleAuthenticateService.authenticateRelevantOtp(args)
  }
  throw new Error('No source or otp provided.')
}

const handleResendOtp = (args) => {
  if (args.otp.source) {
    return handleOtpService.resendOtp(args)
  }
  throw new Error('No source is provided.')
}

module.exports = {
  handleOtp,
  handleAuthenticateOtp,
  handleResendOtp,
}
