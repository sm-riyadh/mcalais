import Router from 'express'
import Validator from './validator/tree'
import Ops from '../operations/tree'

// Express > Router
const app = Router()

// Route
const url = 'api/tree'

// CODE: Fetch

app.get(`/${url}`, async (req, res, next) => {
  try {
    const { company } = req.query

    Validator.fetch({ company })

    const data = Ops.fetch({ company })

    return res.send(data)
  } catch (err) {
    return next(err)
  }
})

/* ---------------------------------- REPLACE --------------------------------- */

app.put(`/${url}`, async (req, res, next) => {
  try {
    const { company, tree } = req.body

    Validator.put({ company, tree })

    const data = Ops.put({ company, tree })

    return res.send(data)
  } catch (err) {
    return next(err)
  }
})

export default app
