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

    const data = await Ops.fetch({ company })

    return res.send(data)
  } catch (error) {
    return next(error)
  }
})

/* ---------------------------------- REPLACE --------------------------------- */

app.put(`/${url}`, async (req, res, next) => {
  try {
    const { company, tree } = req.body

    Validator.put({ company, tree })

    const data = await Ops.put({ company, tree })

    return res.send(data)
  } catch (error) {
    return next(error)
  }
})

export default app
