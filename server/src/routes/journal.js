import Router from 'express'
import validator from 'validator'
// import { Types } from 'mongoose'
import sudoData from '../sudoJournal'
import Ledger from '../models/ledger'

// Express > Router
const app = Router()
// CHECK SERVER STATUS
app.get('/', (req, res) => res.send('Server is working :}'))

// Journal

// FETCHES

app.get('/journal', async (req, res) => {
  const { size } = req.query

  try {
    if (!validator.isNumeric(size)) throw err

    const ledger = await Ledger.findJournal()
    let journal = []

    console.log(
      '$: ledger',
      ledger.map(ledger =>
        ledger._doc.transactions.map(
          transaction =>
            (journal = [
              ...journal,
              {
                debit: ledger.code,
                credit: transaction.credit,
                amount: transaction.amount,
              },
            ])
        )
      )
    )

    return res.send(trimData(journal, undefined, req.query.size))
  } catch (err) {
    return res.send('Error: ' + err)
  }
})
// date >= +e.data - daySub(1)
app.post('/journal', (req, res) => {
  const { time, debit, credit, amount } = req.body

  // Validation
  try {
    if (
      !(
        validator.isNumeric(time) &&
        validator.isNumeric(debit) &&
        validator.isNumeric(credit) &&
        validator.isNumeric(amount)
      )
    )
      throw e
  } catch (e) {
    return res.send('LOL')
  }

  let data = { id: 999, time, debit: +debit, credit: +credit, amount: +amount }
  data = [data, ...sudoData]

  return res.send(trimData(data))
})

app.delete('/journal', (req, res) => {
  const { id } = req.query
  try {
    if (!validator.isNumeric(id)) throw e
  } catch (e) {
    return res.send('LOL')
  }

  let data = [...sudoData]
  data = trimData(data, 0, 10)
  data = data.filter(item => item.id !== +id)

  return res.send(trimData(data, 0, 10))
})

export default app
