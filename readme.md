# OTP As Service
A simple otp micro-service built using NodeJS and GraphQL

## Usage
1. Clone the repo.
2. npm i.
3. node index.js.
4. Visit localhost:4000/graphql

## DOCS

### 1. Create OTP
```
mutation {
  createOtp(otp: {
    source: "sms",
    contactNumber: "99999",
    template: "Custom template is ##OTP##" // Optional field
  }) {
    id
  }
}
```

### 2. Authenticate OTP
```
mutation {
  authenticateOtp(otp: {
    source: "sms",
    contactNumber: "99999",
    otp: "nodg3"
  }) {
    result
  }
}
```

### 3. Resend OTP
```
mutation {
  resendOtp(otp: {
    source: "email",
    email: "sre@df.com"
  }) {
    result
  }
}
```

### 4. List all active services
```
query {
  active {
    id
    otp
    active
  }
}
```

### 5. List all services
```
query {
  all {
    id
    otp
    active
  }
}
```
