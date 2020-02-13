import Router from 'express'
import validator from 'validator'
import Journal from '../models/journal'
import Coa from '../models/coa'
// import { Types } from 'mongoose'

// Express > Router
const app = Router()

// Route
const url = 'api/journal'

app.get(`/${url}`, async (req, res) => {
  try {
    const { site, size, page, coa, startDate, endDate } = req.query

    if (!coa) {
      const journal = await Journal.fetch(
        site,
        null,
        size,
        page,
        startDate,
        endDate
      )
      return res.send(journal)
    } else {
      const journal = await Journal.fetch(
        site,
        coa,
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
  const { site, credit, debit, description, amount, comment } = req.body

  try {
    // Validation
    if (
      !validator.isNumeric(credit) ||
      !validator.isNumeric(debit) ||
      !validator.isNumeric(amount) ||
      !(amount > 0)
    )
      throw 'Invalid type'

    if (!(await Coa.isExist(credit)) || !(await Coa.isExist(debit)))
      throw 'Invilid coa code'

    const debitCoa = await Coa.fetchOneByCode(debit)
    const creditCoa = await Coa.fetchOneByCode(credit)

    const newJournal = await Journal.create({
      site,
      credit: {
        code: creditCoa.code,
        name: creditCoa.name,
      },
      debit: {
        code: debitCoa.code,
        name: debitCoa.name,
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
/*
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
}) */

export default app
