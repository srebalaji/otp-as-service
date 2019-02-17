const { buildSchema } = require('graphql')

module.exports = buildSchema(`
type Query {
  info: String!
}

type Mutation {
  createOtp(otp: otpInput): Otp
  authenticateOtp(otp: authenticateInput): response
  resendOtp(otp: otpInput): response
}

type Otp {
  id: ID!
  otp: String!
  sent: Boolean!
  retries: Int!
  isAuthenticated: Boolean!
  template: String!
}

type response {
  result: String!
}
input otpInput {
  source: String!
  contactNumber: String
  email: String
  template: String
}

input authenticateInput {
  source: String!
  otp: String!
  contactNumber: String
  email: String
}

schema {
  query: Query
  mutation: Mutation
}
`)
