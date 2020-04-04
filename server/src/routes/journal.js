import Router from 'express'

import Validator from './validator/journal'
import Ops from '../operations/account'

// Express > Router
const app = Router()

// Route
const url = 'api/journal'

// CODE: Fetch

app.get(`/${url}`, async (req, res, next) => {
  try {
    const { company, size, page, type, start_date, end_date } = req.query

    Validator.fetch({ company, size, page, type, start_date, end_date })

    const data = Ops.fetch({ company, size, page, type, start_date, end_date })

    return res.send(data)
  } catch (err) {
    return next(err)
  }
})

app.get(`/${url}/:id`, async (req, res) => {
  try {
    const { id } = req.params

    Validator.fetchDetails({ id })

    const data = Ops.fetchDetails({ id })

    return res.send(data)
  } catch (err) {
    return next(err)
  }
})
// CODE: Create

app.post(`/${url}`, async (req, res) => {
  try {
    const { date, company, credit, credit_note, debit, debit_note, description, amount, comment } = req.body

    Validator.create({ date, company, credit, credit_note, debit, debit_note, description, amount, comment })

    const data = Ops.create({
      date,
      company,
      credit,
      credit_note,
      debit,
      debit_note,
      description,
      amount,
      comment,
    })

    return res.send(data)
  } catch (err) {
    return next(err)
  }
})

// CODE: Modify

app.patch(`/${url}`, async (req, res) => {
  try {
    const { id, date, credit_note, debit_note, description, comment } = req.body

    Validator.modify({ id, date, credit_note, debit_note, description, comment })

    const data = Ops.modify({ id, date, company, credit_note, debit_note, description, comment })

    return res.send(data)
  } catch (err) {
    return next(err)
  }
})

app.patch(`/${url}/:id/activate`, async (req, res) => {
  try {
    const { id } = req.params

    Validator.activate({ id })

    const data = Ops.activate({ id, action })

    return res.send(data)
  } catch (err) {
    return next(err)
  }
})

app.patch(`/${url}/:id/deactivate`, async (req, res) => {
  try {
    const { id } = req.params

    Validator.deactivate({ id })

    const data = Ops.deactivate({ id })

    return res.send(data)
  } catch (err) {
    return next(err)
  }
})
// CODE: Activation

app.delete(`/${url}`, async (req, res) => {
  try {
    const { id, action } = req.body

    Validator.state({ id, action })

    const data = Ops.state({ id, action })

    return res.send(data)
  } catch (err) {
    return next(err)
  }
})
export default app
