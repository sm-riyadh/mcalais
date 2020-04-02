import Router from 'express'
import Validator from './validator/...'

// Express > Router
const app = Router()

// Route
const url = 'api/...'

/* ---------------------------------- FETCH --------------------------------- */

app.get(`/${url}`, async (req, res, next) => {
  try {
    const {} = req.query

    Validator.fetch({})

    const data = Func.fetch({})

    return res.send(data)
  } catch (err) {
    return next(err)
  }
})

/* --------------------------------- CREATE --------------------------------- */

app.post(`/${url}`, async (req, res, next) => {
  try {
    const {} = req.body

    Validator.create({})

    const data = Func.create({})

    return res.send(data)
  } catch (err) {
    return next(err)
  }
})

/* ---------------------------------- MODIFY --------------------------------- */

app.patch(`/${url}`, async (req, res, next) => {
  try {
    const {} = req.body

    Validator.modify({})

    const data = Func.modify({})

    return res.send(data)
  } catch (err) {
    return next(err)
  }
})

/* ---------------------------------- REMOVE --------------------------------- */

app.delete(`/${url}`, async (req, res, next) => {
  try {
    const {} = req.body

    Validator.remove({})

    const data = Func.remove({})

    return res.send(data)
  } catch (err) {
    return next(err)
  }
})

export default app
