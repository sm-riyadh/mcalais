import Router from 'express'
import Account from '../models/account'

// Express > Router
const app = Router()

// FETCHES LEDGER
app.get('/ledger', async (req, res) => {
  const { startDate, endDate } = req.query

  try {
    const ledger = await Account.fetchLedger(startDate, endDate)
    console.log('TCL: ledger', ledger)

    return res.send(ledger)
  } catch (err) {
    return res.send('Error: ' + err)
  }
})

export default app
