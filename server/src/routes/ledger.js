import Router from 'express'
import Coa from '../models/coa'

// Express > Router
const app = Router()

// FETCHES COA
app.get('/api/ledger', async (req, res) => {
  const { startDate, endDate } = req.query

  try {
    const coa = await Coa.fetchCoa(startDate, endDate)
    console.log('TCL: coa', coa)

    return res.send(coa)
  } catch (err) {
    return res.send('Error: ' + err)
  }
})
export default app
