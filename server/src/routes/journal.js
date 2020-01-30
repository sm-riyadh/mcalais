import Router from 'express'
import validator from 'validator'
import Journal from '../models/journal'
import Account from '../models/account'
// import { Types } from 'mongoose'

// Express > Router
const app = Router()

// Route
const url = 'api/journal'

app.get(`/${url}`, async (req, res) => {
  const { size, page, ledger, startDate, endDate } = req.query

  try {
    if (!ledger) {
      const journal = await Journal.fetch(null, size, page, startDate, endDate)
      return res.send(journal)
    } else {
      const journal = await Journal.fetch(
        ledger,
        size,
        page,
        startDate,
        endDate
      )
      return res.send(journal)
    }
  } catch (err) {
    return res.send('Error: ' + err)
  }
})

app.post(`/${url}`, async (req, res) => {
  const { credit, debit, description, amount, comment } = req.body

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

    const debitAccount = await Account.fetch(debit)
    const creditAccount = await Account.fetch(credit)

    const newJournal = await Journal.create({
      credit: {
        code: creditAccount[0].code,
        name: creditAccount[0].name,
      },
      debit: {
        code: debitAccount[0].code,
        name: debitAccount[0].name,
      },
      description,
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
