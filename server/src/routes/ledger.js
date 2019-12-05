import Router from 'express'
import Account from '../models/account'

// Express > Router
const app = Router()

// FETCHES LEDGER
app.get('/ledger', async (req, res) => {
  try {
    const ledger = await Account.fetchLedger()

    return res.send(ledger)
  } catch (err) {
    return res.send('Error: ' + err)
  }
})

export default app
