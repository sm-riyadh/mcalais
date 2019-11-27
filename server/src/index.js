import './db/mongoose'
import express from 'express'
import bodyparser from 'body-parser'

// dev-env import
// if (process.env.NODE_ENV !== 'production') {
//   import logger from 'morgan'
// }

import accounts from './routes/accounts'
// import journal from './routes/journal'
// import ledger from './routes/ledger'
const app = express()

// Middlewares
app.use(bodyparser.json())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000') // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

app.use(accounts)

// Server Config
const port = 8080

app.listen(port, () => {
  console.clear()
  console.log(
    `> Server started and running on port: ${port} \n----------------------------------------`
  )
})
