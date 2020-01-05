import Router from 'express'
import validator from 'validator'
import Journal from '../models/journal'
import Account from '../models/account'
// import { Types } from 'mongoose'

// Express > Router
const app = Router()

// Route
const url = 'journal'

// FETCHES
app.get(`/${url}`, async (req, res) => {
  const { size, startDate, endDate } = req.query

  try {
    if (!validator.isNumeric(size)) throw err
    // if (!validator.isISO8601(startDate)) throw err
    // if (!validator.isISO8601(endDate)) throw err

    const journal = await Journal.fetch(size, startDate, endDate)

    return res.send(journal)
  } catch (err) {
    return res.send('Error: ' + err)
  }
})

app.post(`/${url}`, async (req, res) => {
  const { credit, debit, particular, amount, comment } = req.body

  try {
    // Validation
    if (
      !validator.isNumeric(credit) ||
      !validator.isNumeric(debit) ||
      !validator.isNumeric(amount) ||
      !(amount > 0)
    )
      throw 'Invalid type'

    if (!(await Account.isExist(credit)) || !(await Account.isExist(debit)))
      throw 'Invilid account code'

    const { newJournal } = await Journal.create({
      credit,
      debit,
      particular,
      amount,
      comment,
    })

    return res.send(newJournal)
  } catch (err) {
    return res.send('Error: ' + err)
  }
})

// Delete
app.delete(`/${url}`, async (req, res) => {
  const { id } = req.query

  try {
    if (!validator.isMongoId(id)) throw 'Invalid type'

    await Journal.remove(id)
    return res.send()
  } catch (err) {
    return res.send('Error: ' + err)
  }
})

export default app
