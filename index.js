const express = require('express')
const graphqlHTTP = require('express-graphql')
const mongoose = require('mongoose')

const graphqlSchema = require('./src/graphql/schema')
const resolvers = require('./src/graphql/resolvers')

const app = express()

app.use('/graphql', graphqlHTTP({
  schema: graphqlSchema,
  rootValue: resolvers,
  graphiql: true,
}))


mongoose.connect('mongodb://localhost:27017/otp-as-service',
  { useNewUrlParser: true })
  .then(() => {
    app.listen(4000)
  })
  .catch(e => console.log(e))
