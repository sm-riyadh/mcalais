import Router from 'express'
import validator from 'validator'
import { trim } from './utility'
import Accounts from '../models/accounts'

// Express > Router
const app = Router()

// Route
const url = 'accounts'

// Fetch
app.get(`/${url}`, async (req, res) => {
  const { limit } = req.query

  try {
    if (limit) {
      // Fetch with limit
      if (!validator.isNumeric(size)) throw err
      const accounts = await Accounts.fetch(limit)

      return res.send(trim(accounts, 0, req.query.limit))
    } else {
      // Fetch all
      const accounts = await Accounts.fetchAll()

      return res.send(accounts)
    }
  } catch (err) {
    return res.send('Error: ' + err)
  }
})

// Fetch one
app.get(`/${url}/:id`, async (req, res) => {
  try {
    const accounts = await Accounts.fetchOne(req.params.id)
    return res.send(accounts)
  } catch (err) {
    return res.send('Error: ' + err)
  }
})

// Push new
app.push(`/${url}`, async (req, res) => {
  const { name, type } = req.query

  try {
    if (type !== 'Asset' || type !== 'Liability' || type !== 'Equity') throw err

    // Reformating Name
    name = String.trim(name)

    // Generating Code
    let code
    if (type === 'Asset') code = '10000'
    else if (type === 'Liability') code = '20000'
    else if (type === 'Equity') code = '30000'

    const accounts = await Accounts.create({ name, type, code, balance: 0 })

    return res.send(trim(accounts, 0, req.query.limit))
  } catch (err) {
    return res.send('Error: ' + err)
  }
})

// Modify
// app.patch(`/${url}`, async (req, res) => {})
// Delete
app.delete(`/${url}/id:`, async (req, res) => {
  try {
    const accounts = await Accounts.remove(req.params.id)
    return res.send(accounts)
  } catch (err) {
    return res.send('Error: ' + err)
  }
})

export default app
