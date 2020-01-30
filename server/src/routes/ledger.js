import Router from 'express'
import Ledger from '../models/ledger'

// Express > Router
const app = Router()

// FETCHES LEDGER
app.get('/api/ledger', async (req, res) => {
  const { startDate, endDate } = req.query

  try {
    const ledger = await Ledger.fetchLedger(startDate, endDate)
    console.log('TCL: ledger', ledger)

    return res.send(ledger)
  } catch (err) {
    return res.send('Error: ' + err)
  }
})

export default app
