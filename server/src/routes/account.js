import Router from 'express'
import Validator from './validator/journal'
import Ops from '../operations/account'

// Express > Router
const app = Router()

// Route
const url = 'api/account'

// CODE: Fetch

app.get(`/${url}`, async (req, res) => {
  try {
    const { company, nonempty } = req.query

    Validator.fetch({ company, nonempty })

    const data = Ops.fetch({ company, nonempty })

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
    const { company, type, name, path, intercompany } = req.body

    Validator.create({ company, type, name, path, intercompany })

    const data = Ops.create({ company, type, name, path, intercompany })

    return res.send(data)
  } catch (err) {
    return next(err)
  }
})

// CODE: Modify

app.patch(`/${url}`, async (req, res) => {
  try {
    const { id, name, path, intercompany } = req.body

    Validator.modify({ id, name, path, intercompany })

    const data = Ops.modify({ id, name, path, intercompany })

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
    const { company, id } = req.body

    Validator.remove({ company, id })

    const data = Ops.remove({ company, id })

    return res.send(data)
  } catch (err) {
    return next(err)
  }
})

export default app
