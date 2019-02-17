const Otp = require('../models/otp')

const DEFAULT_TEMPLATE = 'Your OTP is ##OTP##'
const DEFAULT_STRING = '##OTP##'


const buildTemplate = (args, generatedOtp) => {
  const template = args.otp.template || DEFAULT_TEMPLATE

  return template.replace(DEFAULT_STRING, generatedOtp)
}

const disableOtherOtps = async sourceObject => Otp.findOneAndUpdate(sourceObject, { $set: { active: false } })

const buildOtp = async (args, sourceObject) => {
  const otp = Math.random().toString(36).substring(7)
  const requestedOtp = Object.assign({}, {
    active: true,
    otp,
    sent: false,
    retries: 0,
    isAuthenticated: false,
    template: buildTemplate(args, otp),
  }, { ...sourceObject })

  const newOtp = new Otp(requestedOtp)

  await disableOtherOtps(sourceObject)

  const result = await newOtp.save()
    .catch((e) => {
      throw new Error(`Error in creating otp ${e}`)
    })
  return result
}

const createSmsOtp = (args) => {
  if (args.otp.contactNumber) {
    return buildOtp(args, {
      contactNumber: args.otp.contactNumber,
      source: args.otp.source,
    })
  }
  throw new Error('No contact number provided.')
}

const createEmailOtp = (args) => {
  if (args.otp.email) {
    return buildOtp(args, {
      email: args.otp.email,
      source: args.otp.source,
    })
  }
  throw new Error('No email provided.')
}

const buildRelevantOtp = (args) => {
  switch (args.otp.source) {
    case 'sms':
      return createSmsOtp(args)
    case 'email':
      return createEmailOtp(args)
    default:
      throw new Error('No relevant source')
  }
}

const resendOtp = args => ({ result: 'success' })

const all = async () => Otp.find({ })

const active = async () => Otp.find({ active: true })

module.exports = {
  buildRelevantOtp,
  resendOtp,
  all,
  active,
}
