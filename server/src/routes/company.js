import Router from 'express'
import Company from '../models/company'
import Coa from '../models/coa'

// Express > Router
const app = Router()

// Route
const url = 'api/company'

app.get(`/${url}`, async res => {
  try {
    const company = await Company.fetch()
    return res.send(company)
  } catch (err) {
    return res.send('Error: ' + err)
  }
})

const newAccountCreator = async (company, type, name, code) => {
  await Coa.create({
    company,
    type,
    name,
    code,
    transaction: [],
  })
  await Company.increaseAccountCount(company, type)
}

app.post(`/${url}`, async (req, res) => {
  const { name } = req.body

  try {
    const newCompany = await Company.create({ name })

    await newAccountCreator(newCompany.name, 'assets', 'Cash', 100001)
    await newAccountCreator(newCompany.name, 'assets', 'Bank', 100002)
    await newAccountCreator(newCompany.name, 'assets', 'Due To', 100003)
    await newAccountCreator(newCompany.name, 'liabilities', 'Due From', 200001)

    return res.send(newCompany)
  } catch (err) {
    return res.send('Error: ' + err)
  }
})

export default app
