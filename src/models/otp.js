const mongoose = require('mongoose')

const { Schema } = mongoose

const otpSchema = new Schema(
  {
    active: {
      type: Boolean,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    sent: {
      type: Boolean,
      required: true,
    },
    retries: {
      type: Number,
      required: true,
    },
    isAuthenticated: {
      type: Boolean,
      required: true,
    },
    contactNumber: {
      type: String,
    },
    email: {
      type: String,
    },
    template: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Otp', otpSchema)
