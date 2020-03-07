import Router from 'express'
import validator from 'validator'
import Coa from '../models/coa'
import Company from '../models/company'

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
    const { balance } = await Company.fetchOne(company)

    const sortedCoa = {
      balance,
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
    const { company } = req.query
    // Fetch all
    const coaList = await Coa.fetchList(company)

    return res.send(coaList)
  } catch (err) {
    return res.send('Error: ' + err)
  }
})

// Patch new
const codeGen = (name, count = 0) => {
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
    const { company, type, name, path, intercompany } = req.body
    
    console.log('path', path)
    const { account_count } = await Company.fetchOne(company)
    const code = codeGen(type, account_count[type])

    await Coa.create({
      company,
      type,
      name,
      code,
      path,
      intercompany,
      transaction: [],
    })
    await Company.updateAccountCount(company, type)
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
