import Router from 'express'
import validator from 'validator'
import Account from '../models/account'

// Express > Router
const app = Router()

// Route
const url = 'account'

// Fetch
app.get(`/${url}`, async (req, res) => {
  try {
    // Fetch all
    const account = await Account.fetchAll()

    return res.send(account)
  } catch (err) {
    return res.send('Error: ' + err)
  }
})

// Push new
// app.post(`/${url}`, async (req, res) => {
//   const { name, type, code } = req.body

//   try {
//     if (type !== 'asset' && type !== 'liability' && type !== 'equity')
//       throw 'Wrong Type'

//     // Generating Code
//     // if (type === 'asset') 100000 <= code && code < 200000
//     // else if (type === 'liability') 200000 <= code && code < 300000
//     // else if (type === 'equity') 300000 <= code && code < 400000

//     const account = await Account.create({ name, type, code })

//     return res.send(account)
//   } catch (err) {
//     return res.send('Error: ' + err)
//   }
// })

// Patch new
app.post(`/${url}`, async (req, res) => {
  const change_tree = req.body

  try {
    // if (type !== 'asset' && type !== 'liability' && type !== 'equity')
    // throw 'Wrong Type'
    // Generating Code
    // if (type === 'asset') 100000 <= code && code < 200000
    // else if (type === 'liability') 200000 <= code && code < 300000
    // else if (type === 'equity') 300000 <= code && code < 400000
    change_tree.map(async (change, index) => {
      if (change.action === 'ADD') {
        await Account.create({
          id: change.data.id,
          name: change.data.name,
          type: change.data.catagory_id,
          under: change.type,
          code: 100009,
        })

        if (change.type === 'preset')
          await Account.insertPreset({
            account_id: change.data.account_id,
            preset_id: change.data.id,
          })
      }
    })

    return res.send()
  } catch (err) {
    return res.send('Error: ' + err)
  }
})

// Delete
app.delete(`/${url}`, async (req, res) => {
  const { id } = req.query

  try {
    if (!validator.isMongoId(id)) throw 'Invalid type'

    await Account.remove(id)
    return res.send()
  } catch (err) {
    return res.send('Error: ' + err)
  }
})

export default app
