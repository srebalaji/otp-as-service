#OTP As Service

1. Request to create otp via email or sms.

2. Request to authenticate the otp.

3. Set the number of times the retries can happen.

4. Have a template to send otp (have default template too)

5. Have a otp type. (number or alpha numeria)

6. Have a time limit for verification

7. Resend otp
{
  active: true,
  source: "sms",
  otp: "1234",
  sent: false,
  retries: 0,
  isAuthenticated: false,
  contactNumber: "999999999",
  email: "example@graphql.com",
}