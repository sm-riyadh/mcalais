import Router from 'express'
import Tree from '../models/tree'
// import { Types } from 'mongoose'

// Express > Router
const app = Router()

// Route
const url = 'api/tree'

app.get(`/${url}`, async (req, res) => {
  try {
    const { company } = req.query
    const tree = await Tree.fetchOne(company)

    return res.send(tree)
  } catch (err) {
    return res.send('Error: ' + err)
  }
})

app.post(`/${url}`, async (req, res) => {
  try {
    const { company, tree } = req.body
    const updatedTree = await Tree.update(company, tree)

    return res.send(updatedTree)
  } catch (err) {
    return res.send('Error: ' + err)
  }
})

export default app
