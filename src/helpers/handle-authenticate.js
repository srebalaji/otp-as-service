const Otp = require('../models/otp')

const handleFailedTry = async (requestedOtp, otpRecord) => {
  await Otp.findOneAndUpdate(requestedOtp, { $set: { retries: otpRecord.retries + 1 } })
    .catch((e) => {
      throw new Error(`Error in updating otp ${e}`)
    })
  return { result: 'Failure. Retry again' }
}

const checkOtp = async (requestedOtp, otpRecord, otp) => {
  if (otpRecord.otp === otp) {
    await Otp.findOneAndUpdate(requestedOtp, { $set: { isAuthenticated: true, active: false } })
      .catch((e) => {
        throw new Error(`Error in updating otp ${e}`)
      })
    return { result: 'success' }
  }
  return handleFailedTry(requestedOtp, otpRecord)
}

const authenticateOtp = async (args, otpObject) => {
  const requestedOtp = Object.assign({}, otpObject, { active: true, isAuthenticated: false })

  const otpRecord = await Otp.findOne(requestedOtp)
    .catch((e) => {
      throw new Error(`Error in fetching otp ${e}`)
    })

  if (otpRecord) {
    return checkOtp(requestedOtp, otpRecord, args.otp.otp)
  }
  throw new Error('No record found. ')
}

const authenticateSmsOtp = (args) => {
  if (args.otp.contactNumber) {
    return authenticateOtp(args, {
      source: 'sms',
      contactNumber: args.otp.contactNumber,
    })
  }
  throw new Error('No contact number provided.')
}

const authenticateEmailOtp = (args) => {
  if (args.otp.email) {
    return authenticateOtp(args, {
      source: 'email',
      email: args.otp.email,
    })
  }
  throw new Error('No email provided.')
}

const authenticateRelevantOtp = (args) => {
  switch (args.otp.source) {
    case 'sms':
      return authenticateSmsOtp(args)
    case 'email':
      return authenticateEmailOtp(args)
    default:
      throw new Error('No relevant source')
  }
}

module.exports = {
  authenticateRelevantOtp,
}
