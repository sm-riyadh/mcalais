import Router from 'express'

import Validator from './validator/company'
import Func from '../func/company'

// Express > Router
const app = Router()

// Route
const url = 'api/company'

/* ---------------------------------- FETCH --------------------------------- */

app.get(`/${url}`, async (req, res) => {
  try {
    // const { } = req.query

    // Validator.fetch({})

    const data = Func.fetch()

    return res.send(data)
  } catch (err) {
    return next(err)
  }
})

/* ---------------------------------- CRATE --------------------------------- */

app.post(`/${url}`, async (req, res) => {
  try {
    const { name } = req.body

    Validator.create({ name })

    const data = Func.create({ name })

    return res.send(data)
  } catch (err) {
    return next(err)
  }
})

/* ---------------------------------- MODIFY --------------------------------- */

app.patch(`/${url}`, async (req, res) => {
  try {
    const { id, name } = req.body

    Validator.modify({ id, name })

    const data = Func.modify({ id, name })

    return res.send(data)
  } catch (err) {
    return next(err)
  }
})

/* ---------------------------------- REMOVE --------------------------------- */

app.delete(`/${url}`, async (req, res) => {
  try {
    const { id } = req.body

    Validator.remove({ id })

    const data = Func.remove({ id })

    return res.send(data)
  } catch (err) {
    return next(err)
  }
})

export default app
