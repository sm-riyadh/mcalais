import Router from 'express'
import validator from 'validator'
import Account from '../models/account'

// Express > Router
const app = Router()

// Route
const url = 'account'

// Fetch
app.get(`/${url}`, async (req, res) => {
  try {
    // Fetch all
    const account = await Account.fetchAll()

    return res.send(account)
  } catch (err) {
    return res.send('Error: ' + err)
  }
})

// Push new
app.post(`/${url}`, async (req, res) => {
  const { name, type, code } = req.body

  try {
    if (type !== 'asset' && type !== 'liability' && type !== 'equity')
      throw 'Wrong Type'

    // Generating Code
    // if (type === 'asset') 100000 <= code && code < 200000
    // else if (type === 'liability') 200000 <= code && code < 300000
    // else if (type === 'equity') 300000 <= code && code < 400000

    const account = await Account.create({ name, type, code })

    return res.send(account)
  } catch (err) {
    return res.send('Error: ' + err)
  }
})

// Delete
app.delete(`/${url}`, async (req, res) => {
  const { id } = req.query

  try {
    if (!validator.isMongoId(id)) throw 'Invalid type'

    await Account.remove(id)
    return res.send()
  } catch (err) {
    return res.send('Error: ' + err)
  }
})

export default app
