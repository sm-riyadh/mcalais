import Router from 'express'

import Validator from './validator/journal'
import Func from '../func/account'

// Express > Router
const app = Router()

// Route
const url = 'api/journal'

/* ---------------------------------- FETCH --------------------------------- */

app.get(`/${url}`, async (req, res, next) => {
  try {
    const { company, size, page, type, start_date, end_date } = req.query

    Validator.fetch({ company, size, page, type, start_date, end_date })

    const data = Func.fetch({ company, size, page, type, start_date, end_date })

    return res.send(data)
  } catch (err) {
    return next(err)
  }
})

/* --------------------------------- CREATE --------------------------------- */

app.post(`/${url}`, async (req, res) => {
  try {
    const { date, company, credit, credit_note, debit, debit_note, description, amount, comment } = req.body

    Validator.create({ date, company, credit, credit_note, debit, debit_note, description, amount, comment })

    const data = Func.create({ date, company, credit, credit_note, debit, debit_note, description, amount, comment })

    return res.send(data)
  } catch (err) {
    return next(err)
  }
})

/* ---------------------------------- MODIFY --------------------------------- */

app.patch(`/${url}`, async (req, res) => {
  try {
    const { id, date, credit_note, debit_note, description, comment } = req.body

    Validator.modify({ id, date, credit_note, debit_note, description, comment })

    const data = Func.modify({ id, date, company, credit_note, debit_note, description, comment })

    return res.send(data)
  } catch (err) {
    return next(err)
  }
})

/* ---------------------------------- REMOVE --------------------------------- */

app.delete(`/${url}`, async (req, res) => {
  try {
    const { id } = req.body

    Validator.modify({ id })

    const data = Func.modify({ id })

    return res.send(data)
  } catch (err) {
    return next(err)
  }
})
export default app
