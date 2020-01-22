import Router from 'express'
import validator from 'validator'
import Account from '../models/account'
import AccountCount from '../models/accountCount'
import Catagory from '../models/catagory'

// Express > Router
const app = Router()

// Route
const url = 'api/account'

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
app.get(`/api/catagory`, async (req, res) => {
  try {
    // Fetch all
    const catagory = await Catagory.fetchAll()

    return res.send(catagory)
  } catch (err) {
    return res.send('Error: ' + err)
  }
})
// Patch new
const codeGen = (catagory_name, count) => {
  switch (catagory_name) {
    case 'assets':
      return 100000 + count + 1
    case 'liabilities':
      return 200000 + count + 1
    case 'equities':
      return 300000 + count + 1
    case 'expenses':
      return 400000 + count + 1
    case 'incomes':
      return 500000 + count + 1
  }
}
app.post(`/${url}`, async (req, res) => {
  const { catagory_tree, change_tree } = req.body

  try {
    change_tree.map(async (change, index) => {
      if (change.action === 'ADD') {
        let count = await AccountCount.add(change.data.catagory_id)
        if (count) count = count.count

        const code = codeGen(change.data.catagory_id, count)

        await Account.create({
          id: change.data.id,
          name: change.data.name,
          type: change.data.catagory_id,
          under: change.type,
          code,
        })
        if (change.type === 'preset')
          await Account.insertPreset({
            account_id: change.data.account_id,
            preset_id: change.data.id,
          })
      }
    })

    await Catagory.update(catagory_tree)

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
