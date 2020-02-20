import Router from 'express'
import validator from 'validator'
import Coa from '../models/coa'
import CoaCount from '../models/coaCount'
import Catagory from '../models/catagory'

// Express > Router
const app = Router()

// Route
const url = 'api/coa'

// Fetch
app.get(`/${url}`, async (req, res) => {
  try {
    const { company } = req.query

    // Fetch all
    const coa = await Coa.fetchAll(company)

    const sortedCoa = {
      assets: [],
      liabilities: [],
      equities: [],
      expenses: [],
      incomes: [],
    }
    sortedCoa.assets = coa.filter(({ code }) => 100000 < code && code < 200000)
    sortedCoa.liabilities = coa.filter(
      ({ code }) => 200000 < code && code < 300000
    )
    sortedCoa.equities = coa.filter(
      ({ code }) => 300000 < code && code < 400000
    )
    sortedCoa.expenses = coa.filter(
      ({ code }) => 400000 < code && code < 500000
    )
    sortedCoa.incomes = coa.filter(({ code }) => 500000 < code && code < 600000)

    return res.send(sortedCoa)
  } catch (err) {
    return res.send('Error: ' + err)
  }
})
app.get(`/${url}/list`, async (req, res) => {
  try {
    // Fetch all
    const coaList = await Coa.fetchList()

    return res.send(coaList)
  } catch (err) {
    return res.send('Error: ' + err)
  }
})
//
//
//
//
//
// app.get(`/api/catagory`, async (req, res) => {
//   try {
//     // Fetch all
//     const catagory = await Catagory.fetchAll()

//     return res.send(catagory)
//   } catch (err) {
//     return res.send('Error: ' + err)
//   }
// })
// Patch new
const codeGen = (name, count) => {
  switch (name) {
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
  try {
    const { company, type, name } = req.body

    const { count } = await CoaCount.fetch(company, type)
    const code = codeGen(type, count)

    await Coa.create({
      company,
      type,
      name,
      code,
      transaction: [],
    })

    await CoaCount.newAccount(company, type)

    // Fetch all
    const coa = await Coa.fetchAll(company)

    const sortedCoa = {
      assets: [],
      liabilities: [],
      equities: [],
      expenses: [],
      incomes: [],
    }
    sortedCoa.assets = coa.filter(({ code }) => 100000 < code && code < 200000)
    sortedCoa.liabilities = coa.filter(
      ({ code }) => 200000 < code && code < 300000
    )
    sortedCoa.equities = coa.filter(
      ({ code }) => 300000 < code && code < 400000
    )
    sortedCoa.expenses = coa.filter(
      ({ code }) => 400000 < code && code < 500000
    )
    sortedCoa.incomes = coa.filter(({ code }) => 500000 < code && code < 600000)

    return res.send(sortedCoa)
  } catch (err) {
    return res.send('Error: ' + err)
  }
})
// app.post(`/${url}`, async (req, res) => {
//   const { catagory_tree, change_tree } = req.body

//   try {
//     change_tree.map(async (change, index) => {
//       if (change.action === 'ADD') {
//         let count = await CoaCount.add(change.data.catagory_id)
//         if (count) count = count.count

//         const code = codeGen(change.data.catagory_id, count)

//         await Coa.create({
//           id: change.data.id,
//           name: change.data.name,
//           type: change.data.catagory_id,
//           under: change.type,
//           code,
//         })
//         if (change.type === 'preset')
//           await Coa.insertPreset({
//             coa_id: change.data.coa_id,
//             preset_id: change.data.id,
//           })
//       }
//     })

//     await Catagory.update(catagory_tree)

//     return res.send()
//   } catch (err) {
//     return res.send('Error: ' + err)
//   }
// })

// Delete
app.delete(`/${url}`, async (req, res) => {
  const { id } = req.query

  try {
    if (!validator.isMongoId(id)) throw 'Invalid type'

    await Coa.remove(id)
    return res.send()
  } catch (err) {
    return res.send('Error: ' + err)
  }
})

export default app
