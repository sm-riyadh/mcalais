import Router from 'express'
import Validator from './validator/journal'
import Func from '../func/account'

// Express > Router
const app = Router()

// Route
const url = 'api/account'

/* ---------------------------------- Fetch --------------------------------- */

app.get(`/${url}`, async (req, res) => {
  try {
    const { company, nonempty } = req.query

    Validator.fetch({ company, nonempty })

    const data = Func.fetch({ company, nonempty })

    return res.send(data)
  } catch (err) {
    return next(err)
  }
})

/* --------------------------------- CREATE --------------------------------- */

app.post(`/${url}`, async (req, res) => {
  try {
    const { company, type, name, path, intercompany } = req.body

    Validator.create({ company, type, name, path, intercompany })

    const data = Func.create({ company, type, name, path, intercompany })

    return res.send(data)
  } catch (err) {
    return next(err)
  }
})

/* --------------------------------- MODIFY --------------------------------- */

app.patch(`/${url}`, async (req, res) => {
  try {
    const { id, name, path, intercompany } = req.body

    Validator.modify({ id, name, path, intercompany })

    const data = Func.modify({ id, name, path, intercompany })

    return res.send(data)
  } catch (err) {
    return next(err)
  }
})

/* --------------------------------- DELETE --------------------------------- */

app.delete(`/${url}`, async (req, res) => {
  try {
    const { company, id } = req.body

    Validator.remove({ company, id })

    const data = Func.remove({ company, id })

    return res.send(data)
  } catch (err) {
    return next(err)
  }
})

export default app
