// import './db/mongoose'
import express from 'express'
import bodyparser from 'body-parser'

// dev-env import
// if (process.env.NODE_ENV !== 'production') {
//   import logger from 'morgan'
// }

import authentication from './routes/chartOfAccounts'
const app = express()

// Middlewares
app.use(bodyparser.json())

app.use(authentication, company, buyer, draft, order)

// Server Config
const port = 8080

app.listen(port, () => {
	console.clear()
	console.log(`> Server started and running on port: ${port} \n----------------------------------------`)
})
