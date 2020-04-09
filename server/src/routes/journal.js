import Router from 'express'

import Validator from './validator/journal'
import Ops from '../operations/journal'

// Express > Router
const app = Router()

// Route
const url = 'api/journal'

// CODE: Fetch

app.get(`/${url}`, async (req, res, next) => {
  try {
    const { company, size, page, type, start_date, end_date } = req.query

    await Validator.fetch({ company, size, page, type, start_date, end_date })

    const data = await Ops.fetch({ company, size, page, type, start_date, end_date })

    return res.send(data)
  } catch (error) {
    return next(error)
  }
})

app.get(`/${url}/:id`, async (req, res, next) => {
  try {
    const { id } = req.params

    await Validator.fetchDetails({ id })

    const data = await Ops.fetchDetails({ id })

    return res.send(data)
  } catch (error) {
    return next(error)
  }
})
// CODE: Create

app.post(`/${url}`, async (req, res, next) => {
  try {
    const { date, company, credit, credit_note, debit, debit_note, description, amount, comment } = req.body

    await Validator.create({ date, company, credit, credit_note, debit, debit_note, description, amount, comment })

    const data = await Ops.create({
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
  } catch (error) {
    return next(error)
  }
})

// CODE: Modify

app.patch(`/${url}/:id`, async (req, res, next) => {
  try {
    const { id } = req.params

    const { date, credit_note, debit_note, description, comment } = req.body

    await Validator.modify({ id, date, credit_note, debit_note, description, comment })

    const data = await Ops.modify({ id, date, credit_note, debit_note, description, comment })

    return res.send(data)
  } catch (error) {
    return next(error)
  }
})

app.patch(`/${url}/:id/activate`, async (req, res, next) => {
  try {
    const { id } = req.params

    await Validator.activate({ id })

    const data = await Ops.activate({ id })

    return res.send(data)
  } catch (error) {
    return next(error)
  }
})

app.patch(`/${url}/:id/deactivate`, async (req, res, next) => {
  try {
    const { id } = req.params

    await Validator.deactivate({ id })

    const data = await Ops.deactivate({ id })

    return res.send(data)
  } catch (error) {
    return next(error)
  }
})

export default app
