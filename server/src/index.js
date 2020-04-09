import './db/mongoose'
import express from 'express'
import cors from 'cors'
import bodyparser from 'body-parser'

import { host, port } from './config'

// Routes
import journal from './routes/journal'
import account from './routes/account'
import company from './routes/company'
import tree from './routes/tree'

const app = express()

// Cors Config
const whitelist = [ `http://${host}` ]
const corsOptions = {
  origin               : (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) callback(null, true)
    else callback(new Error('Not allowed by CORS'))
  },
  optionsSuccessStatus : 200,
}

// Middlewares
app.use(cors(corsOptions))
app.use(bodyparser.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', `http://${host}`)
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accepcact')
  res.header('Access-Control-Allow-Methods', [ 'GET', 'POST', 'PATCH', 'DELETE' ])
  next()
})

app.use(journal)
app.use(account)
app.use(company)
app.use(tree)

// Server Config

app.listen(port, () => {
  console.clear()
  console.log(`> Time: ${new Date()}\n> Host: ${host}\n> Post: ${port} \n----------------------------------------`)
})
