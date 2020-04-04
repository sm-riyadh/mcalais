import Router from 'express'

import Validator from './validator/company'
import Ops from '../operations/company'

// Express > Router
const app = Router()

// Route
const url = 'api/company'

// CODE: Fetch

app.get(`/${url}`, async (req, res) => {
  try {
    const data = Ops.fetch()

    return res.send(data)
  } catch (err) {
    return next(err)
  }
})

app.get(`/${url}/:id`, async (req, res) => {
  try {
    const { id } = req.params

    Validator.fetchDetails({ id })

    const data = Ops.fetchfetchDetails({ id })

    return res.send(data)
  } catch (err) {
    return next(err)
  }
})

// CODE: Create

app.post(`/${url}`, async (req, res) => {
  try {
    const { name } = req.body

    Validator.create({ name })

    const data = Ops.create({ name })

    return res.send(data)
  } catch (err) {
    return next(err)
  }
})

// CODE: Modify

app.patch(`/${url}/:id`, async (req, res) => {
  try {
    const { id } = req.params
    const { name } = req.body

    Validator.modify({ id, name })

    const data = Ops.modify({ id, name })

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

// CODE: Remove

app.delete(`/${url}`, async (req, res) => {
  try {
    const { id } = req.body

    Validator.remove({ id })

    const data = Ops.remove({ id })

    return res.send(data)
  } catch (err) {
    return next(err)
  }
})

export default app
