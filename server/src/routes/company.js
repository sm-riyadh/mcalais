import Router from 'express'

import Validator from './validator/company'
import Ops from '../operations/company'

// Express > Router
const app = Router()

// Route
const url = 'api/company'

// CODE: Fetch

app.get(`/${url}`, async (req, res, next) => {
  try {
    const data = await Ops.fetch()

    return res.send(data)
  } catch (error) {
    return next(error)
  }
})

app.get(`/${url}/:id`, async (req, res, next) => {
  try {
    const { id } = req.params

    Validator.fetchDetails({ id })

    const data = await Ops.fetchDetails({ id })

    return res.send(data)
  } catch (error) {
    return next(error)
  }
})

// CODE: Create

app.post(`/${url}`, async (req, res, next) => {
  try {
    const { name } = req.body

    Validator.create({ name })

    const data = await Ops.create({ name })

    return res.send(data)
  } catch (error) {
    return next(error)
  }
})

// CODE: Modify

app.patch(`/${url}/:id`, async (req, res, next) => {
  try {
    const { id } = req.params
    const { name } = req.body

    Validator.modify({ id, name })

    const data = await Ops.modify({ id, name })

    return res.send(data)
  } catch (error) {
    return next(error)
  }
})

app.patch(`/${url}/:id/activate`, async (req, res, next) => {
  try {
    const { id } = req.params

    Validator.activate({ id })

    const data = await Ops.activate({ id })

    return res.send(data)
  } catch (error) {
    return next(error)
  }
})
app.patch(`/${url}/:id/deactivate`, async (req, res, next) => {
  try {
    const { id } = req.params

    Validator.deactivate({ id })

    const data = await Ops.deactivate({ id })

    return res.send(data)
  } catch (error) {
    return next(error)
  }
})

// CODE: Remove

app.delete(`/${url}/:id`, async (req, res, next) => {
  try {
    const { id } = req.params

    Validator.remove({ id })

    const data = await Ops.remove({ id })

    return res.send(data)
  } catch (error) {
    return next(error)
  }
})

export default app
